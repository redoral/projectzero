"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// imports express and monster controller
const express = require("express");
const monster = require("./controller/monsterController");
// intialize express to app variable, define port to use, enable json middleware
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// monsters endpoints
const monstersRouter = express.Router();
monstersRouter.get('/', monster.getAllMonsters); // gets all monsters, default endpoint
monstersRouter.get('/:type', monster.getAllMonstersByType); // gets all monsters in specified type
monstersRouter.get('/:type/:name', monster.getMonster); // gets a specific monster in a type
monstersRouter.put('/add', monster.addMonster); // adds a new monster
monstersRouter.put('/update/:id/', monster.updateMonster); // updates an existing monster via id
monstersRouter.delete('/delete/:id', monster.deleteMonster); // deletes a monster
// binds /monsters endpoint to the monstersRouter
app.use('/monsters', monstersRouter);
// start server using defined port
app.listen(port, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
