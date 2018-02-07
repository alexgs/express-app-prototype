import Brewery from './brewery';

const Beer = `
    type Beer {
        abv: Float
        brewery: Brewery
        brewery_id: String
        category: String
        description: String
        ibu: Float
        id: ID
        name: String
        style: String
        type: String
        upc: Int
        updated: String
    }
`;

export default () => [ Beer, Brewery ];
