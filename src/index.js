import bodyParser from 'body-parser';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';

import glados from '@philgs/glados';

import routes from './routes';

const app = express();
const appRoot = path.resolve( __dirname, '..' );


// --- VIEW ENGINE SETUP ---

app.set( 'views', path.resolve( appRoot, 'views' ) );
app.set( 'view engine', 'ejs' );


// --- CONFIGURE GLADOS ---

const gladosOptions = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackUrl: process.env.AUTH0_CALLBACK_URL
};
glados.configureOAuth2( gladosOptions, app );
glados.configureSessionStore( app.locals );


// --- CONFIGURE LOGGING ---

if ( process.env.NODE_ENV === 'development' ) {
    app.use( logger( 'dev' ) );
} else if ( process.env.NODE_ENV === 'production' ) {
    app.use( logger( 'dev' ) );
}   // default: do nothing (no logging)


// --- CONFIGURE MIDDLEWARE ---

// Trust first proxy in production, so cookies are secure
if ( process.env.NODE_ENV === 'production' ) {
    app.set( 'trust proxy', 1 );
}

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( glados.getSessionMiddleware() );
app.use( flash() );
app.use( '/static', express.static( path.resolve( appRoot, 'static' ) ) );


// --- CONFIGURE ROUTES ---

app.use( '/', routes.root );
app.use( '/login', routes.login );
app.use( '/glados', routes.glados );
app.use( '/spike', routes.spike );


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
