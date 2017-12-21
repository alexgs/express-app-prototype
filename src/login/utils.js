import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const auth0PublicKey = fs.readFileSync( path.resolve( __dirname, '../../config/ickyzoo-auth0-com.pem' ) );

export function auth0Verify( accessToken, refreshToken, extraParams, profile, done ) {
    // TODO Handle ID token, create user profile, and create session ID here

    return verifyJwtSignature( extraParams.id_token, auth0PublicKey )
        .then( idToken => {
            const userData = {
                profile: idToken
            };
            return done( null, userData );
        } );

}

function verifyJwtSignature( idToken, publicKey ) {
    return new Promise( ( resolve, reject ) => {
        jwt.verify( idToken, publicKey, ( error, decodedToken ) => {
            if ( error ) {
                reject( error );
            } else {
                resolve( decodedToken );
            }
        } );
    } );
}
