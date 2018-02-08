// @flow
import _ from 'lodash';
import type { BreweryDef } from '../schemas/brewery';
import bucket from '../../data-sources/couchbase';

// query OneBrewery { brewery(id: "512_brewing_company") { name city country } }

function breweryResolver( obj:any, args:{ id:string } ) {
    return breweryById( args[ 'id' ] );
}

function breweryById( breweryId:string ):Promise<BreweryDef> {
    return new Promise( ( resolve, reject ) => {
        bucket.get( breweryId, ( error, result, meta ) => {
            if ( error ) {
                reject( { CouchbaseError: error } );
            } else {
                const breweryData = _.merge( {}, result.value, { id: breweryId } );
                resolve( breweryData );
            }
        } );
    } );
}

export default breweryResolver;
export { breweryById };
