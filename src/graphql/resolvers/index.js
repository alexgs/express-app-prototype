// @flow

import brewery from './brewery';
import breweries from './breweries';

const resolvers = {
    RootQuery: {
        brewery,
        breweries
    }
};

export default resolvers;
