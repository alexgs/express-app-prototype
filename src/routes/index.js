import { graphqlExpress, graphiqlExpress, } from 'graphql-server-express';
import schema from '../schema';
import restApi from './rest-api';
import root from './root';

const graphQlRoute = graphqlExpress( { schema } );
const graphIqlRoute = graphiqlExpress( {
    endpointURL: '/graphql'         // This is the endpoint where it can run GraphQL queries
} );

export {
    restApi as api,
    graphQlRoute as graphql,
    graphIqlRoute as graphIql,
    root
};
