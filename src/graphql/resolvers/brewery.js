// @flow

import bucket from '../../data-sources/couchbase';

// query OneBrewery { brewery(id: "512_brewing_company") { name city country } }

export default function breweryResolver( obj, args ) {
    return new Promise( ( resolve, reject ) => {
        bucket.get( args[ 'id' ], ( error, result, meta ) => {
            if ( error ) {
                reject( { CouchbaseError: error } );
            } else {
                resolve( result.value );
            }
        } );
    } )
}
