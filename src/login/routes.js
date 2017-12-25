import { ensureAuthenticated } from 'connect-ensure-login';
import flash from 'connect-flash'
import express from 'express';
import passport from 'passport';

const PARENT_ROUTE = '/login';
const AUTHENTICATION_PATH = '/login/';
// const checkAuth = ensureAuthenticated( AUTHENTICATION_PATH );
const checkAuth = function( request, response, next ) {
    if ( !request.session.user ) {
        flash('No session user object');
        response.redirect( `${PARENT_ROUTE}/login-failed` );
    }
    return next();
};
const router = express.Router();

const auth0 = {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    callbackURL: process.env.AUTH0_CALLBACK_URL
};

// Handle login
// noinspection JSUnresolvedFunction
router.get(
    '/',
    passport.authenticate( 'auth0', {
        clientID: auth0.clientID,
        domain: auth0.domain,
        redirectUri: auth0.callbackURL,
        audience: `https://${auth0.domain}/userinfo`,
        responseType: 'code',
        scope: 'openid email'
    } ),
    ( request, response ) => {
        response.redirect( '/' );
    }
);

// Perform session logout and redirect to homepage
// TODO Get this to work fully, so that no cookies are set
router.get(
    '/logout',
    ( request, response ) => {
        request.logout();
        response.redirect( '/' );
    }
);

// Perform the final stage of authentication and redirect
// router.get(
//     '/auth-complete',
//     passport.authenticate( 'auth0', {
//         failureFlash: true,
//         failureRedirect: `${PARENT_ROUTE}/login-failed`,
//         session: false
//     } ),
//     ( request, response ) => {
//         return response.redirect( request.session.returnTo || `${PARENT_ROUTE}/auth-details` )
//     }
// );

router.get(
    '/auth-complete',
    ( request, response, next ) => {
        passport.authenticate( 'auth0',
            {
                failureFlash: true,
                failureRedirect: `${PARENT_ROUTE}/login-failed`,
                session: false
            },
            ( error, user, info ) => {
                if ( error ) {
                    next( error );
                }

                if ( !user ) {
                    response.redirect( '/login' );
                }

                console.log( '>>> USER <<< ' + JSON.stringify( user, null, 4 ) );
                request.session.user = user;
                request.session.save( error => {
                    response.redirect( request.session.returnTo || `${PARENT_ROUTE}/auth-details` );
                } );
            }
        )( request, response, next );     // `authenticate` returns a middleware function, which we have to invoke
    }
);

router.get(
    '/auth-details',
    // checkAuth,
    // TODO Try a custom middleware that reloads the page until the cookie is loaded (or some count is exceeded)
    ( request, response, next ) => {
        response.render( 'auth-details', {
            // info: JSON.stringify( request.session.info, null, 4 ),
            userObject: JSON.stringify( request.session.user, null, 4 )
        } );
    }
);

router.get(
    '/login-failed',
    ( request, response ) => {
        response.render( 'login-failed', {
            flash: request.flash('error')
        } )
    }
);

export default router;
