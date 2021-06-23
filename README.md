# The Witcher 3 Beastiary API 🐺
A RESTFul API that provides the name, type, susceptibility, and loot drops of each monster.
## Usage
This API uses [Express](https://expressjs.com/) for routing endpoints and [DynamoDB](https://aws.amazon.com/dynamodb/) to store and retrieve each monster.
The server returns a **JSON object** of each monster's information as a response.

### Getting Monsters

You can get all monsters, all monsters under a specific category (type), or a single monster. You can simply do all of these by specifying the endpoint. 

**Examples:**
* http://localhost:3000/monsters - returns all of the monsters.
* http://localhost:3000/monsters/beasts - returns all of the monsters under the ***Beasts*** category.
* http://localhost:3000/monsters/beasts/bear - only returns the information for ***Bear***, which is under the ***Beasts*** category.

> For types and/or names with spaces, use underscores. For instance:<br>
> http://localhost:3000/monsters/cursed_ones/the_toad_prince


### Adding, Updating, and Deleting Monsters

1. For adding, send a POST request to the /monsters endpoint.
2. For updating, send a PUT request to the /monsters/{type}/{name} endpoint and specify the type and name of the monster you want to update in the URI.
3. For deleting, send a DELETE request to the /monsters/{type}}/{name} endpoint and specify the type and name of the monster you want to delete in the URI.


**Examples:**
* [POST] http://localhost:3000/monsters/  - adds a new monster using a put request's body, takes a JSON object.
* [PUT] http://localhost:3000/monsters/beasts/bear - updates the monster 'bear' (which is of type beasts) using the put request's body, takes a JSON object.
* [DELETE] http://localhost:3000/monsters/beasts/bear - deletes the monster bear.