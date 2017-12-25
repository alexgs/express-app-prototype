import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import uuid from 'uuid';
import { ERROR_SOURCE } from '../constants';
import { errorFactory } from '../utils';

const auth0PublicKey = fs.readFileSync( path.resolve( __dirname, '../../config/ickyzoo-auth0-com.pem' ) );

export function generateSessionId( request ) {
    return uuid.v4();
}

export function getSessionCookieName() {
    return 'sid';
}

export function getSessionKey() {
    const rawData = fs.readFileSync( process.env.SESSION_SECRET, 'utf8' );
    return rawData.split('\n').join('');
}

export function verifyAuth0IdToken( accessToken, refreshToken, extraParams, profile, done ) {
    return verifyJwtSignature( extraParams.id_token, auth0PublicKey )
        .then( idToken => validateJwtClaims( idToken ) )
        .then( idToken => {
            // TODO Create user profile and create session ID
            const userData = {
                profile: idToken
            };
            return done( null, userData );
        } )
        .catch( error => {
            if ( error.source && ( error.source === ERROR_SOURCE.JWT.CLAIMS
                    || error.source === ERROR_SOURCE.JWT.SIGNATURE ) )
            {
                return done( null, false, { message: error.message } );
            } else {
                // Unexpected error
                return done( error );
            }
        } );
}

function validateJwtClaims( idToken ) {
    // The current date/time must be before the expiration date/time listed in the `exp` claim
    if ( Date.now() < idToken.exp ) {
        throw errorFactory( 'The ID token has expired.', ERROR_SOURCE.JWT.CLAIMS );
    }

    // The `iss` value must match the the URL of your Auth0 tenant
    if ( idToken.iss !== `https://${process.env.AUTH0_DOMAIN}/`) {
        throw errorFactory( `The ID token has an invalid issuer: ${idToken.iss}.`, ERROR_SOURCE.JWT.CLAIMS );
    }

    // The `aud` value must match the Client ID of your Auth0 Client.
    if ( idToken.aud !== process.env.AUTH0_CLIENT_ID ) {
        throw errorFactory( `The ID token has an invalid audience: ${idToken.aud}.`, ERROR_SOURCE.JWT.CLAIMS );
    }

    return Promise.resolve( idToken );
}

function verifyJwtSignature( idToken, publicKey ) {
    return new Promise( ( resolve, reject ) => {
        jwt.verify( idToken, publicKey, ( error, decodedToken ) => {
            if ( error ) {
                reject( errorFactory( error.message, ERROR_SOURCE.JWT.SIGNATURE ) );
            } else {
                resolve( decodedToken );
            }
        } );
    } );
}
