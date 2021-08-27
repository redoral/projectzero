"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creates a default monster class that implements the imonster interface
class Monster {
<<<<<<< HEAD
    constructor(id, name, type, image, susceptibility, loot) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.image = image;
        this.susceptibility = susceptibility;
=======
    constructor(id, name, type, susceptiblity, loot) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.susceptiblity = susceptiblity;
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
        this.loot = loot;
    }
}
exports.default = Monster;
