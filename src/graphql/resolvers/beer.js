// @flow

import _ from 'lodash';
import { bucket, N1qlQuery } from '../../data-sources/couchbase';

// query OneBeer { beer( id: "512_brewing_company-512_pecan_porter" ) }

export default function beerResolver( obj, args ) {
    return new Promise( ( resolve, reject ) => {
        bucket.get( args[ 'id' ], ( error, result, meta ) => {
            if ( error ) {
                reject( { CouchbaseError: error } );
            } else {
                const beerData = _.merge( {}, result.value, { id: args[ 'id' ] } );
                resolve( beerData );
            }
        } );
    } )

}

function beersByBrewery( breweryId ) {
    return new Promise( ( resolve, reject ) => {
        const queryString = `
            SELECT
                abv,
                category,
                description,
                ibu,
                META().id, 
                name, 
                style,
                type,
                upc,
                updated
            FROM \`beer-sample\`
            WHERE type = "beer" AND brewery_id = $1    
        `;
        const query = N1qlQuery.fromString( queryString );
        bucket.query( query, [ breweryId ], ( error, rows, meta ) => {
            if ( error ) {
                // console.log( `>>> ${error} <<<` );
                reject( `>>> Couchbase: ${error.message} <<<` );
            } else {
                resolve( rows );
            }
        } );
    } );
}

export { beersByBrewery };
