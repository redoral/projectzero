"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports all from aws-sdk, imonster interface, and dotenv config
const AWS = __importStar(require("aws-sdk"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
// configure aws for access using environment variables (dotenv)
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
// init dynamoclient, define db table
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const MONSTERS_TABLE = process.env.MONSTERS_TABLE;
// monsterdao class that implements imonsterdao interface, includes all db methods
class MonsterDao {
    // gets all monsters from the database
    async getMonsters() {
        const params = { TableName: MONSTERS_TABLE };
        const beasts = await dynamoClient.scan(params).promise();
        return Promise.resolve(beasts.Items);
    }
    // gets all monsters of a certain type from the database
    async getMonstersByType(type) {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeValues: { ':type': type },
            ExpressionAttributeNames: {
                '#type': 'type',
            },
        };
        const monsters = await dynamoClient
            .query(params, (err) => {
            if (err) {
                console.log(err, err.stack);
            }
        })
            .promise();
        return Promise.resolve(monsters.Items);
    }
    // gets a specific monster from the database
    async getOneMonster(name, type) {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
            KeyConditionExpression: '#name = :name and #type = :type',
            ExpressionAttributeValues: {
                ':name': name,
                ':type': type,
            },
            ExpressionAttributeNames: {
                '#name': 'name',
                '#type': 'type',
            },
        };
        const monster = await dynamoClient
            .query(params, (err) => {
            if (err) {
                console.log(err, err.stack);
            }
        })
            .promise();
        return Promise.resolve(monster.Items);
    }
    // adds a new monster to the database
    async addOrUpdateMonster(monster) {
        const params = {
            TableName: MONSTERS_TABLE,
            Item: monster,
        };
        await dynamoClient.put(params).promise();
        Promise.resolve(null);
    }
    // deletes a monster from the database
    async deleteMonster(type, name) {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
            Key: { type: type, name: name },
        };
        await dynamoClient
            .delete(params, function (err, data) {
            if (err)
                console.log(err);
            else
                console.log(data);
        })
            .promise();
        Promise.resolve(null);
    }
}
exports.default = MonsterDao;
