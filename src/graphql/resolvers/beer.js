// @flow
import * as couchbase from '../../data-sources/couchbase';
import type { BeerDef } from '../schemas/beer';

function beerResolver( obj:any, args:{ id:string } ):Promise<BeerDef> {
    return couchbase.retrieveById( args.id );
}

function beersByBrewery( breweryId:string ):Promise<Array<BeerDef>> {
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
    return couchbase.retrieveByQuery( queryString, [breweryId ] );
}

export default beerResolver;
export { beersByBrewery };
