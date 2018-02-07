// @flow

import allBreweries from './all-breweries';
import beer, { beersByBrewery } from './beer';
import brewery, { breweryById } from './brewery';

const resolvers = {
    Query: {
        allBreweries,
        brewery,
        beer
    },
    Beer: {
        brewery: beer => breweryById( beer.brewery_id )
    },
    Brewery: {
        beers: brewery => beersByBrewery( brewery.id )
    }
};

export default resolvers;
