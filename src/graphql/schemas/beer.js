// @flow
import Brewery from './brewery';
import type { BreweryDef } from './brewery';

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
export type BeerDef = {
    abv:number,
    brewery:BreweryDef,
    brewery_id:string,
    category:string,
    description:string,
    ibu:number,
    id:string,
    name:string,
    style:string,
    type:string,
    upc:number,
    updated:string
};
