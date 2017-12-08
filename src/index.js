import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import path from 'path';

import routes from './routes';

const app = express();
const appRoot = path.resolve( __dirname, '..' );

// View engine setup
app.set( 'views', path.resolve( appRoot, 'views' ) );
app.set( 'view engine', 'ejs' );

// Configure logging
if ( process.env.NODE_ENV === 'development' ) {
    app.use( logger( 'dev' ) );
} else if ( process.env.NODE_ENV === 'production' ) {
    app.use( logger( 'dev' ) );
}   // default: do nothing (no logging)

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        domain: 'ickyzoo.auth0.com',
        clientID: 'JoVzWhQOwQwIkialwg6uY5GfOAhfdI_A',
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: 'http://calypso.sword:5426/login/auth-complete'
    },
    ( accessToken, refreshToken, extraParams, profile, done ) => {
        return done( null, profile );
    }
);
// noinspection JSCheckFunctionSignatures
passport.use( strategy );

// Configure middleware
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( '/static', express.static( path.resolve( appRoot, 'static' ) ) );
app.use( passport.initialize() );
app.use( passport.session() );

// Configure routes
app.use( '/', routes.root );
app.use( '/login', routes.login );

// Catch 404 and forward to error handler
app.use( function( req, res, next ) {
    const error404 = new Error( 'Not Found' );
    error404.status = 404;
    next( error404 );
} );

// Error handler
app.use( function( error, request, response, next ) {
    // Set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error = process.env[ 'NODE_ENV' ] !== 'production' ? error : {};

    // Render the error page
    response.status( error.status || 500 );
    response.render( 'error' );
} );

module.exports = app;
