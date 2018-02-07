// This uses a modular schema, see the [Apollo GraphQL Tools][1] documentation for more.
// [1]: https://www.apollographql.com/docs/graphql-tools/generate-schema.html#modularizing

import Brewery from './brewery';

export const RootQuery = `
    type RootQuery {
        brewery(id:String!): Brewery,
        breweries: [Brewery]
    }
`;

export const schemas = [
    Brewery
];
