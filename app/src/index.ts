// imports express and monster controller
import express from 'express';
import cors from 'cors'; 
import * as monster from './controller/monsterController';

// intialize express, define port to use, enable json middleware
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// monsters endpoints
const monstersRouter = express.Router();
monstersRouter.get('/monsters', monster.getAllMonsters); // calls the getAllMonsters() function from the controller
monstersRouter.get('/monsters/:type', monster.getAllMonstersByType); // calls the getAllMonstersByType() function from the controller
monstersRouter.get('/monsters/:type/:name', monster.getMonster); // calls the getMonster() function from the controller
monstersRouter.post('/monsters', monster.addMonster); // calls the addMonster() function from the controller
monstersRouter.put('/monsters/:type/:name', monster.updateMonster); // calls the updateMonster() function from the controller
monstersRouter.delete('/monsters/:type/:name', monster.deleteMonster); // calls the deleteMonster() function from the controller

// setup base endpoint
app.use(monstersRouter);

// starts server using defined port
app.listen(port, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});