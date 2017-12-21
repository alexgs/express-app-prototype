import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import path from 'path';

import { auth0Verify } from './login/utils';
import routes from './routes';

const app = express();
const appRoot = path.resolve( __dirname, '..' );


// --- VIEW ENGINE SETUP ---

app.set( 'views', path.resolve( appRoot, 'views' ) );
app.set( 'view engine', 'ejs' );


// --- CONFIGURE PASSPORT TO USE AUTH0 ---

const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    auth0Verify
);
// noinspection JSCheckFunctionSignatures
passport.use( strategy );

// Write session data to a cookie
passport.serializeUser( ( user, done ) => {
    // TODO Control serialization and cookie
    done(null, user);
} );

// Read session data from a cookie
passport.deserializeUser( ( user, done ) => {
    done(null, user);
} );


// --- CONFIGURE LOGGING ---

if ( process.env.NODE_ENV === 'development' ) {
    app.use( logger( 'dev' ) );
} else if ( process.env.NODE_ENV === 'production' ) {
    app.use( logger( 'dev' ) );
}   // default: do nothing (no logging)


// --- CONFIGURE MIDDLEWARE ---

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
// TODO Secure session with options and `libsodium`
app.use( session( {
    secret: 'asdf09987',
    resave: true,
    saveUninitialized: true
} ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( '/static', express.static( path.resolve( appRoot, 'static' ) ) );


// --- CONFIGURE ROUTES ---

app.use( '/', routes.root );
app.use( '/login', routes.login );


// --- ERROR HANDLERS ---

// Catch 404 and forward to error renderer
app.use( ( request, response, next ) => {
    const error404 = new Error( 'Not Found' );
    error404.status = 404;
    next( error404 );
} );

// Error renderer
app.use( ( error, request, response, next ) => {
    // Set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error = process.env[ 'NODE_ENV' ] !== 'production' ? error : {};

    // Render the error page
    response.status( error.status || 500 );
    response.render( 'error' );
} );

module.exports = app;
