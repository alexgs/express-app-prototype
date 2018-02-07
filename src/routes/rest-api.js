import couchbase from 'couchbase';
import express from 'express';
const router = express.Router();

const bucketName = process.env.COUCHBASE_BUCKET;
const host = process.env.COUCHBASE_HOST;
const password = process.env.COUCHBASE_PASSWORD;
const username = process.env.COUCHBASE_USERNAME;

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


export default router;
