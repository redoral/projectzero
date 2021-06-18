"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBeasts = exports.addMonster = exports.getAllMonsters = void 0;
//import monster dao
const monsterDao_1 = require("./dao/monsterDao");
// create new dao object to use methods
const monsterDao = new monsterDao_1.default();
// get all monsters asynchronously by calling the getMonsters() function from the monster dao
async function getAllMonsters(req, res) {
    try {
        const monsters = await monsterDao.getMonsters();
        return res.status(200).json(monsters);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: 'Something went wrong.' });
    }
}
exports.getAllMonsters = getAllMonsters;
// adds monster via json request
async function addMonster(req, res) {
    try {
        await monsterDao.addMonster(req.body);
        return res.status(200).send("Monster added successfully.");
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: 'Something went wrong.' });
    }
}
exports.addMonster = addMonster;
// gets all beasts asynchronously by calling the getBeasts() function from the monster dao
async function getAllBeasts(req, res) {
    try {
        const monsters = await monsterDao.getBeasts('beasts');
        return res.status(200).json(monsters);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: 'Something went wrong.' });
    }
}
exports.getAllBeasts = getAllBeasts;
