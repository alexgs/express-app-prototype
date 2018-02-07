// @flow

import { bucket, N1qlQuery } from '../../data-sources/couchbase';

// query ManyBreweries { breweries { id name city country } }

function breweriesResolver( obj ) {
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

export default breweriesResolver;
