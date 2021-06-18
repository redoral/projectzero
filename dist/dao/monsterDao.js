"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import monster interface
const AWS = require("aws-sdk");
const dotenv_1 = require("dotenv");
dotenv_1.config();
// configure aws for access
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// init dynamoclient, define db table, call dotenv config
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const MONSTERS_TABLE = "w3_beastiary";
// monsterdao class that implements imonsterdao interface, includes all database methods
class MonsterDao {
    // gets all monsters from the database
    async getMonsters() {
        const params = {
            TableName: MONSTERS_TABLE,
        };
        const beasts = await dynamoClient.scan(params).promise();
        return beasts.Items;
    }
    // gets specific monster from database
    async getOneMonster(name, type) {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: "type-name-index",
            KeyConditionExpression: "#name = :name and #type = :type",
            ExpressionAttributeValues: {
                ":name": name,
                ":type": type
            },
            ExpressionAttributeNames: {
                "#name": "name",
                "#type": "type"
            }
        };
        const monster = await dynamoClient.query(params, (err) => {
            if (err) {
                console.log(err, err.stack);
            }
        }).promise();
        return monster.Items;
    }
    // gets all monsters where type = beasts from the database
    async getMonstersByType(type) {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
            ScanIndexForward: false,
            ExpressionAttributeValues: { ":type": type },
            ExpressionAttributeNames: { "#type": "type" },
            KeyConditionExpression: "#type = :type"
        };
        const beasts = await dynamoClient.query(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            }
        }).promise();
        return beasts.Items;
    }
    // gets specific monster from database
    async getMonsterById(id) {
        const params = {
            TableName: MONSTERS_TABLE,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeValues: {
                ":id": id,
            },
            ExpressionAttributeNames: {
                "#id": "id",
            }
        };
        const monster = await dynamoClient.query(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            }
        }).promise();
        return monster.Items;
    }
    // adds a new monster to the database
    async addOrUpdateMonster(monster) {
        const params = {
            TableName: MONSTERS_TABLE,
            Item: monster
        };
        await dynamoClient.put(params).promise();
    }
    // deletes a monster from the database
    async deleteMonster(monsterId) {
        const params = {
            TableName: MONSTERS_TABLE,
            Key: { id: monsterId }
        };
        await dynamoClient.delete(params, function (err, data) {
            if (err)
                console.log(err);
            else
                console.log(data);
        }).promise();
    }
}
exports.default = MonsterDao;
