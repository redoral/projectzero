"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// imports all from aws-sdk, imonster interface, and dotenv config
const AWS = require("aws-sdk");
const dotenv_1 = require("dotenv");
dotenv_1.config();
// configure aws for access using environment variables (dotenv)
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// init dynamoclient, define db table
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const MONSTERS_TABLE = process.env.MONSTERS_TABLE;
// monsterdao class that implements imonsterdao interface, includes all database methods
class MonsterDao {
    // gets all monsters from the database
    async getMonsters() {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
            ProjectionExpression: '#name, #type, susceptibility, loot',
            ExpressionAttributeNames: {
                '#name': 'name',
                '#type': 'type'
            }
        };
        const beasts = await dynamoClient.scan(params).promise();
        return Promise.resolve(beasts.Items);
    }
    // gets all monsters of a certain type from the database
    async getMonstersByType(type) {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
            ScanIndexForward: true,
            ProjectionExpression: '#name, #type, susceptibility, loot',
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeValues: { ':type': type },
            ExpressionAttributeNames: {
                '#type': 'type',
                '#name': 'name'
            }
        };
        const monsters = await dynamoClient.query(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            }
        }).promise();
        return Promise.resolve(monsters.Items);
    }
    // gets a specific monster from the database
    async getOneMonster(name, type) {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
            ProjectionExpression: '#name, #type, susceptibility, loot',
            KeyConditionExpression: '#name = :name and #type = :type',
            ExpressionAttributeValues: {
                ':name': name,
                ':type': type
            },
            ExpressionAttributeNames: {
                '#name': 'name',
                '#type': 'type'
            }
        };
        const monster = await dynamoClient.query(params, (err) => {
            if (err) {
                console.log(err, err.stack);
            }
        }).promise();
        return Promise.resolve(monster.Items);
    }
    // gets monster by id from the database
    async getMonsterById(id) {
        const params = {
            TableName: MONSTERS_TABLE,
            KeyConditionExpression: '#id = :id',
            ExpressionAttributeValues: {
                ':id': id,
            },
            ExpressionAttributeNames: {
                '#id': 'id',
            }
        };
        const monster = await dynamoClient.query(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            }
        }).promise();
        return Promise.resolve(monster.Items);
    }
    // adds a new monster to the database
    async addOrUpdateMonster(monster) {
        const params = {
            TableName: MONSTERS_TABLE,
            Item: monster
        };
        await dynamoClient.put(params).promise();
        return Promise.resolve(null);
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
        return Promise.resolve(null);
    }
}
exports.default = MonsterDao;
