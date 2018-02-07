// @flow

import _ from 'lodash';
import bucket from '../../data-sources/couchbase';

// query OneBrewery { brewery(id: "512_brewing_company") { name city country } }

export default function breweryResolver( obj, args ) {
    return breweryById( args[ 'id' ] );
}

function breweryById( breweryId ) {
    return new Promise( ( resolve, reject ) => {
        bucket.get( breweryId, ( error, result, meta ) => {
            if ( error ) {
                reject( { CouchbaseError: error } );
            } else {
                const breweryData = _.merge( {}, result.value, { id: breweryId } );
                resolve( breweryData );
            }
        } );
    } )

}

export { breweryById };
