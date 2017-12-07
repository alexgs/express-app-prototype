const child_process = require( 'child_process' );
const fs = require( 'fs' );
const path = require( 'path' );
const _ = require( 'lodash' );

const projectRoot = path.resolve( __dirname, '..' );

// Read environment variables from file
const configFilePath = path.resolve( projectRoot, 'config/config.json' );
const configFile = JSON.parse( fs.readFileSync( configFilePath ) );
const config = configFile.data;

// Spawn a child process
const command = process.argv[ 2 ];
const args = process.argv.slice( 3 );
const spawnOptions = {
    cwd: projectRoot,
    env: _.merge( {}, config, process.env ),
    shell: true,
    stdio: 'inherit'
};

const child = child_process.spawn( command, args, spawnOptions );
process.on( 'SIGTERM', () => child.kill( 'SIGTERM' ) );
process.on( 'SIGINT', () => child.kill( 'SIGINT' ) );
process.on( 'SIGBREAK', () => child.kill( 'SIGBREAK' ) );
process.on( 'SIGHUP', () => child.kill( 'SIGHUP' ) );

// Exit cleanly, even if a test fails in the child process (or something else goes wrong).
process.exitCode = 0;
