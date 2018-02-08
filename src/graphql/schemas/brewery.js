// @flow
import Beer from './beer';
import type { BeerDef } from './beer';

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
export type BreweryDef = {
    address:Array<string>,
    beers:Array<BeerDef>,
    city:string,
    country:string,
    description:string,
    id:string,
    name:string,
    phone:string,
    state:string,
    updated:string,
    website:string
};
