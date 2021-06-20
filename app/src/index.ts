// imports
import * as express from 'express';
import * as monster from './controller/Monsters';

// intialize express to app variable, define port to use, enable json middleware
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// welcome screen for base uri
app.use('/', (req, res) => {
  res.send("Welcome to the Witcher 3 Beastiary API. Created by Red Oral.");
});

// monsters endpoints
const monstersRouter = express.Router();
monstersRouter.get('/', monster.getAllMonsters); //gets all monsters, default endpoint
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