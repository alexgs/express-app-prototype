// @flow
import type { BreweryDef } from '../schemas/brewery';
import { bucket, N1qlQuery } from '../../data-sources/couchbase';

// query AllBreweries { allBreweries { id name city country } }

function allBreweriesResolver():Promise<Array<BreweryDef>> {
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

export default allBreweriesResolver;
