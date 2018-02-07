import { makeExecutableSchema } from 'graphql-tools';
import { Query, schemas } from './schemas';
import resolvers from './resolvers';

export default makeExecutableSchema( {
    typeDefs: [ Query, ...schemas ],
    resolvers
} );
