const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const express = require( 'express' );
const logger = require( 'morgan' );
const path = require( 'path' );

const routes = require( './routes' );

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

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( '/static', express.static( path.resolve( appRoot, 'static' ) ) );

app.use( '/', routes.root );
app.use( '/api', routes.api );
app.use( '/graphql', routes.graphql );
app.use( '/graphiql', routes.graphIql );

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
