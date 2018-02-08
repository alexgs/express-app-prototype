// @flow
import * as couchbase from '../../data-sources/couchbase';
import type { BreweryDef } from '../schemas/brewery';

function breweryResolver( obj:any, args:{ id:string } ) {
    return breweryById( args.id );
}

function breweryById( breweryId:string ):Promise<BreweryDef> {
    return couchbase.retrieveById( breweryId );
}

export default breweryResolver;
export { breweryById };
