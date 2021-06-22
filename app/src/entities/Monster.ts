// defines all keys monsters
export interface IMonster {
    id: number;
    name: string;
    type: string;
    susceptiblity: [];
    loot: [];
}

// creates a default monster class that implements the imonster interface
export default class Monster implements IMonster{
    constructor(public id:number, public name:string, public type:string, public susceptiblity:[], public loot:[]){}
}