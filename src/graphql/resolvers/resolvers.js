// @flow

import couchbase from 'couchbase';
const bucketName = String( process.env.COUCHBASE_BUCKET );
const host = String( process.env.COUCHBASE_HOST );
const password = String( process.env.COUCHBASE_PASSWORD );
const username = String( process.env.COUCHBASE_USERNAME );

const cluster = new couchbase.Cluster( `couchbase://${host}/` );
cluster.authenticate( username, password );
const bucket = cluster.openBucket( bucketName );
const N1qlQuery = couchbase.N1qlQuery;

// Sample query for GraphIql or whatever:

const resolvers = {
    RootQuery: {
        brewery( obj, args ) {
            // Sample query: { brewery(id: "512_brewing_company") { name city country } }
            return new Promise( ( resolve, reject ) => {
                bucket.get( args[ 'id' ], ( error, result, meta ) => {
                    if ( error ) {
                        reject( { CouchbaseError: error } );
                    } else {
                        resolve( result.value );
                    }
                } );
            } )
        },
        breweries( obj ) {
            // Sample query: { breweries { id name city country } }
            return new Promise( ( resolve, reject ) => {
                const queryString = `
                    SELECT
                        address,
                        city, 
                        country,
                        description,
                        META().id, 
                        name, 
                        phone,
                        state,
                        updated,
                        website
                    FROM \`beer-sample\`
                    WHERE type = "brewery" AND country != ""    
                `;
                const query = N1qlQuery.fromString( queryString );
                bucket.query( query, ( error, rows, meta ) => {
                    if ( error ) {
                        reject( { CouchbaseError: error } );
                    } else {
                        resolve( rows );
                    }
                } );

            } );
        }
    }
};

export default resolvers;
