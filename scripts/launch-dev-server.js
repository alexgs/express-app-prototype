// This script should be run with `babel-node`

// Module dependencies.
const app = require( '../src/index' );
const debug = require( 'debug' )( 'http' );
const http = require( 'http' );
const morgan = require( 'morgan' );

// Set logging to the console
app.use( morgan( 'dev' ) );

// Get port from environment and store in Express.
const port = normalizePort( process.env[ 'PROTOTYPE_PORT' ] );
app.set( 'port', port );

// Create HTTP server.
const server = http.createServer( app );

// Listen on provided port, on all network interfaces.
server.listen( port );
server.on( 'error', onError );
server.on( 'listening', onListening );

// Normalize a port into a number, string, or false.
function normalizePort( value ) {
    const port = parseInt( value, 10 );

    if ( isNaN( port ) ) {
        throw new Error( `No valid port specified; received ${value}` );
    }

    if ( port >= 0 ) {
        // port number
        return port;
    }

    return false;
}

// Event listener for HTTP server "error" event.
function onError( error ) {
    if ( error.syscall !== 'listen' ) {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // Handle specific listen errors with friendly messages
    switch ( error.code ) {
        case 'EACCES':
            console.error( bind + ' requires elevated privileges' );
            process.exitCode = 1;
            break;
        case 'EADDRINUSE':
            console.error( bind + ' is already in use' );
            process.exitCode = 2;
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    const address = server.address();
    const bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port;
    debug( 'Listening on ' + bind );
}
