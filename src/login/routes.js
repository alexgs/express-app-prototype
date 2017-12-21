import { ensureAuthenticated } from 'connect-ensure-login';
import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import path from 'path';

const PARENT_ROUTE = '/login';
const AUTHENTICATION_PATH = '/login/';
const checkAuth = ensureAuthenticated( AUTHENTICATION_PATH );
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
router.get(
    '/auth-complete',
    passport.authenticate( 'auth0', { failureRedirect: '/' } ),
    ( request, response ) => response.redirect( request.session.returnTo || `${PARENT_ROUTE}/auth-details` )
);

router.get(
    '/auth-details',
    checkAuth,
    ( request, response, next ) => {
        response.render( 'auth-details', {
            userObject: JSON.stringify( request.user, null, 4 )
        } );
    }
);

export default router;
