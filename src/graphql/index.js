import { makeExecutableSchema } from 'graphql-tools';
import { RootQuery, schemas } from './schemas';
import resolvers from './resolvers';

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
    typeDefs: [ SchemaDefinition, RootQuery, ...schemas ],
    resolvers
});
