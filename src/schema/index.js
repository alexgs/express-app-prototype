// This uses a modular scheme, see the [Apollo GraphQL Tools][1] documentation for more.
// [1]: https://www.apollographql.com/docs/graphql-tools/generate-schema.html#modularizing

import { makeExecutableSchema } from 'graphql-tools';
import Brewery from './brewery';
import resolvers from './resolvers';

const RootQuery = `
    type RootQuery {
        brewery(id:String!): Brewery
    }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
    typeDefs: [ SchemaDefinition, RootQuery, Brewery ],
    resolvers
});
