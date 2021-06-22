// imports express and monster controller
import * as express from 'express';
import * as monster from './controller/monsterController';

// intialize express, define port to use, enable json middleware
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// monsters endpoints
const monstersRouter = express.Router();
monstersRouter.get('/monsters', monster.getAllMonsters); // gets all monsters, default endpoint
monstersRouter.get('/monsters/:type', monster.getAllMonstersByType); // gets all monsters in specified type
monstersRouter.get('/monsters/:type/:name', monster.getMonster); // gets a specific monster in a type
monstersRouter.post('/monsters', monster.addMonster); // adds a new monster
monstersRouter.put('/monsters/:id', monster.updateMonster); // updates an existing monster via id
monstersRouter.delete('/monsters/:id', monster.deleteMonster); // deletes a monster

// binds /monsters endpoint to the monstersRouter
app.use('/', monstersRouter);

// start server using defined port
app.listen(port, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});