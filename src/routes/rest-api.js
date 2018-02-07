// @flow

import couchbase from 'couchbase';
import express from 'express';
const router = express.Router();

const bucketName = String( process.env.COUCHBASE_BUCKET );
const host = String( process.env.COUCHBASE_HOST );
const password = String( process.env.COUCHBASE_PASSWORD );
const username = String( process.env.COUCHBASE_USERNAME );

const cluster = new couchbase.Cluster( `couchbase://${host}/` );
cluster.authenticate( username, password );
const bucket = cluster.openBucket( bucketName );
const N1qlQuery = couchbase.N1qlQuery;

// GET all breweries
router.get( '/breweries', function( request, response, next ) {
    const queryString = `
        SELECT META().id, name, city, country
        FROM \`beer-sample\` brewery
        WHERE type = "brewery" AND country != ""    
    `;
    const query = N1qlQuery.fromString( queryString );
    bucket.query( query, ( error, rows, meta ) => {
        if ( error ) {
            response.send( { CouchbaseError: error } );
        } else {
            response.json( rows );
        }
    } );
} );

// GET a specific brewery
router.get( '/breweries/:breweryId', function( request, response, next ) {
    bucket.get( request.params[ 'breweryId' ], ( error, result, meta ) => {
        if ( error ) {
            response.send( { CouchbaseError: error } );
        } else {
            response.json( result.value );
        }
    } );
} );

// GET all beers from a specific brewery
router.get( '/breweries/:breweryId/beers', function( request, response, next ) {
    const queryString = `
        SELECT META().id, name, category, style
        FROM \`beer-sample\`
        WHERE type = "beer" AND brewery_id = $1    
    `;
    const query = N1qlQuery.fromString( queryString );
    bucket.query( query, [ request.params[ 'breweryId' ] ], ( error, rows, meta ) => {
        if ( error ) {
            response.send( { CouchbaseError: error } );
        } else {
            response.json( rows );
        }
    } );
} );

export default router;
