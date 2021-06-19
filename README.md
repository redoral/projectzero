# Witcher 3 Beastiary API 🐺
A RESTFul API that provides the name, type, susceptibility, and loot drops of each monster.
## Usage
This API uses [ExpressJS](https://expressjs.com/) to create endpoints and [DynamoDB](https://aws.amazon.com/dynamodb/) to store and retrieve each monster.
The server returns a **JSON object** of each monster as a response.

### Getting Monsters

There are 3 ways to get monster data with this API, and you can simply do this by specifying the endpoints. 

**Examples:**
* http://localhost:3000/monsters - returns all of the monsters.
* http://localhost:3000/monsters/Beasts - returns all of the monsters under the ***Beasts*** category.
* http://localhost:3000/monsters/Beasts/Bear - only returns the information for ***Bear***, which is under the ***Beasts*** category.

### Adding, Updating, and Deleting Monsters

For adding and updating, the server takes the request's body (a JSON object) and sends it to the database. For deleting, you just have to specify the monster's id in the URI.

**Examples:**
* http://localhost:3000/monsters/add - adds a new monster using a put request's body, takes a JSON object.
* http://localhost:3000/monsters/update/1 - updates the monster with an ***id*** of ***1*** using a put request's body, takes a JSON object.
* http://localhost:3000/monsters/delete/1 - deletes the monster with an ***id*** of ***1***.
