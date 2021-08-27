// imports MonsterDao class
import MonsterDao from '../dao/monsterDao';
import { Request, Response } from 'express';

// creates a new object from MonsterDao class
const monsterDao = new MonsterDao();

// capitalizes the first letter of every word in the provided string, replaces underscore with spaces
// example: replaces 'cursed_ones' with 'Cursed Ones'
function uriManipulator(str) {
  let i: number,
    splitter = str.split('_');
  for (i = 0; i < splitter.length; i++) {
    splitter[i] = splitter[i].charAt(0).toUpperCase() + splitter[i].slice(1);
  }

  return splitter.join(' ');
}

// gets all monsters by calling getAllMonsters() function from the dao
export async function getAllMonsters(req: Request, res: Response) {
  try {
    return res.status(200).json(await monsterDao.getMonsters());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: 'Something went wrong.' });
  }
}

// gets monsters by type by calling the getAllMonstersByType() function from the dao
export async function getAllMonstersByType(req: Request, res: Response) {
  // takes the value of type from the request parameters and calls the uriManipulator function to that value
  const { type } = req.params;
  const monsterType = uriManipulator(type);

  try {
    return res
      .status(200)
      .json(await monsterDao.getMonstersByType(monsterType));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: 'Something went wrong.' });
  }
}

// gets specific monster by calling the getOneMonster() function from the dao
export async function getMonster(req: Request, res: Response) {
  // takes the value of name and type from the request parameters and calls the uriManipulator function on the two values
  const { name, type } = req.params;
  const monsterName = uriManipulator(name);
  const monsterType = uriManipulator(type);

  try {
    return res
      .status(200)
      .json(await monsterDao.getOneMonster(monsterName, monsterType));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: 'Something went wrong.' });
  }
}

// adds monster by calling the addOrUpdateMonster() function from the dao
export async function addMonster(req: Request, res: Response) {
  const monsterCheck = await monsterDao.getOneMonster(
    req.body.type,
    req.body.name
  );
  const monsterKeys = Object.keys(monsterCheck);

  // checks if monster already exists via name and type, stops user if yes
  if (monsterKeys.length > 0) {
    return res.status(400).json({ err: 'Monster already exists.' });
  } else {
    try {
      await monsterDao.addOrUpdateMonster(req.body);
      return res.status(200).send('Monster added successfully.');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ err: 'Something went wrong.' });
    }
  }
}

// updates a monster by calling the addOrUpdateMonster() function from the dao
export async function updateMonster(req: Request, res: Response) {
  const { type, name } = req.params;
  const monsterType = uriManipulator(type);
  const monsterName = uriManipulator(name);

  const monsterCheck = await monsterDao.getOneMonster(monsterType, monsterName);
  const monsterKeys = Object.keys(monsterCheck);

  // checks if monster already exists via name and type, stops user if no
  // also ensures that the user is updating the right item by checking the id in the uri and request body
  if (monsterKeys.length === 0) {
    return res.status(400).json({ err: 'Item does not exist.' });
  } else if (req.body.name === monsterName && req.body.type === monsterType) {
    try {
      await monsterDao.addOrUpdateMonster(req.body);
      return res.status(200).send('Monster updated successfully.');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ err: 'Something went wrong.' });
    }
  } else {
    return res
      .status(400)
      .json({ err: 'Cannot modify name and type of monster.' });
  }
}

// deletes a monster by calling the deleteMonster() from the the dao
export async function deleteMonster(req: Request, res: Response) {
  const { type, name } = req.params;
  const monsterType = uriManipulator(type);
  const monsterName = uriManipulator(name);

  try {
    await monsterDao.deleteMonster(monsterType, monsterName);
    return res.status(200).send('Monster deleted successfully.');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: 'Something went wrong.' });
  }
}
