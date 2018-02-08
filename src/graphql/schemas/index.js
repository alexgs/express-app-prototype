// This uses a modular schema, see the [Apollo GraphQL Tools][1] documentation for more.
// [1]: https://www.apollographql.com/docs/graphql-tools/generate-schema.html#modularizing

import Beer from './beer';
import Brewery from './brewery';

export const Query = `
    type Query {
        allBreweries: [ Brewery ]
        brewery( id:ID! ): Brewery
        beer( id:ID! ): Beer
    }
`;

export const schemas = [ Beer, Brewery ];
