// imports MonsterDao class
import MonsterDao from '../dao/monsterDao';

// creates a new object from MonsterDao class
const monsterDao = new MonsterDao();

// gets all monsters
export async function getAllMonsters(req, res){
  try{
    const monsters = await monsterDao.getMonsters();
    return res.status(200).json(monsters);
  }catch (error){
    console.error(error);
    return res.status(500).json({err: 'Something went wrong.'});
  }
}

// gets monsters by type
export async function getAllMonstersByType(req, res){
  // takes the value of type from the uri and calls the uriManipulator function to that value
  const { type } = req.params;
  const monsterType = uriManipulator(type);

  try{
    const monsters = await monsterDao.getMonstersByType(monsterType);
    return res.status(200).json(monsters);
  }catch (error){
    console.error(error);
    return res.status(500).json({err: 'Something went wrong.'});
  }
}

// gets specific monster
export async function getMonster(req, res){
  // takes the value of name and type from the uri and calls the uriManipulator function on the two values
  const { name, type } = req.params;
  const monsterName = uriManipulator(name);
  const monsterType = uriManipulator(type);

  try{
    const monster = await monsterDao.getOneMonster(monsterName, monsterType);
    return res.status(200).json(monster);
  }catch (error){
    console.error(error);
    return res.status(500).json({err: 'Something went wrong.'});
  }
}

// adds monster
export async function addMonster(req, res){
  const monsterCheck = await monsterDao.getMonsterById(Number(req.body.id));
  const monsterKeys = Object.keys(monsterCheck);

  // checks if monster already exists via id, stops user if yes
  if (monsterKeys.length > 0){
    return res.status(400).send('Item with id already exists. Try using /monsters/update/{id} instead if you want to update a monster.');
  } else {
    try{
      await monsterDao.addOrUpdateMonster(req.body);
      return res.status(200).send('Monster added successfully.');
    }catch (error){
      console.error(error);
      return res.status(500).json({err: 'Something went wrong.'});
    }
  }
}

// updates a monster
export async function updateMonster(req, res){
  const { id } = req.params;
  const monsterCheck = await monsterDao.getMonsterById(Number(id))
  const monsterKeys = Object.keys(monsterCheck);

  // checks if monster already exists via id, stops user if no
  // also ensures that the user is updating the right item by checking the id in the uri and request body
  if (monsterKeys.length === 0){
    return res.status(400).json({err: 'Item does not exist'});
  } else if (Number(req.body.id) === Number(id)){ 
    try{
      await monsterDao.addOrUpdateMonster(req.body);
      return res.status(200).send('Monster updated successfully.');
    }catch (error){
      console.error(error);
      return res.status(500).json({err: 'Something went wrong.'});
    }
  } else {
    return res.status(400).json({err: 'Cannot modify id of monster. Please make sure the id in the uri matches the monster you are updating.'});
  }
}

// deletes a monster (your children will love you for this one)
export async function deleteMonster(req, res){
  const { id } = req.params;

  try{
    await monsterDao.deleteMonster(Number(id));
    return res.status(200).send('Monster deleted successfully.');
  }catch (error){
    console.error(error);
    return res.status(500).json({err: 'Something went wrong.'});
  }
}

// function that capitalizes the first letter of every word, replaces underscore with spaces
function uriManipulator(str){
  let i:number, splitter = str.split('_');
  for (i = 0; i < splitter.length; i++){
    splitter[i] = splitter[i].charAt(0).toUpperCase() + splitter[i].slice(1);
  }

  return splitter.join(' ');
}
