// defines all keys monsters
export interface IMonster {
    id: number;
    name: string;
    type: string;
    susceptiblity: [];
    loot: [];
}

// creates a default monster class that implements the imonster interface
class Monster implements IMonster{
    constructor(public id, public name, public type, public susceptiblity, public loot){}
}

export default Monster;