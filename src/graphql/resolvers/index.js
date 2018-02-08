// @flow
import allBreweries from './all-breweries';
import beer, { beersByBrewery } from './beer';
import brewery, { breweryById } from './brewery';
import type { BeerDef } from '../schemas/beer';
import type { BreweryDef } from '../schemas/brewery';

const resolvers = {
    Query: {
        allBreweries,
        brewery,
        beer
    },
    Beer: {
        brewery: ( beer:BeerDef ) => breweryById( beer.brewery_id )
    },
    Brewery: {
        beers: ( brewery:BreweryDef ) => beersByBrewery( brewery.id )
    }
};

export default resolvers;
