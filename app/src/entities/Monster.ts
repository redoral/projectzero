// defines all keys monsters
export interface IMonster {
  id: number;
  name: string;
  type: string;
  image: string;
  susceptibility: [];
  loot: [];
}

// creates a default monster class that implements the imonster interface
export default class Monster implements IMonster {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public image: string,
    public susceptibility: [],
    public loot: []
  ) {}
}
