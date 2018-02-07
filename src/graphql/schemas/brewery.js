import Beer from './beer';

const Brewery = `
    type Brewery {
        address: [String]
        beers: [Beer]
        city: String
        country: String
        description: String
        id: ID
        name: String
        phone: String
        state: String
        updated: String
        website: String
    }
`;

export default () => [ Beer, Brewery ];
