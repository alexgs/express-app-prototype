// @flow
import * as couchbase from '../../data-sources/couchbase';
import type { BreweryDef } from '../schemas/brewery';

function allBreweriesResolver():Promise<Array<BreweryDef>> {
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
    return couchbase.retrieveByQuery( queryString );
}

export default allBreweriesResolver;
