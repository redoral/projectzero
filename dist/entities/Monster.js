"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creates a default monster class that implements the imonster interface
class Monster {
    constructor(id, name, type, image, susceptibility, loot) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.image = image;
        this.susceptibility = susceptibility;
        this.loot = loot;
    }
}
exports.default = Monster;
