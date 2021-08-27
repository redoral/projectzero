"use strict";
<<<<<<< HEAD
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
=======
Object.defineProperty(exports, "__esModule", { value: true });
// imports all from aws-sdk, imonster interface, and dotenv config
const AWS = require("aws-sdk");
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
const dotenv_1 = require("dotenv");
dotenv_1.config();
// configure aws for access using environment variables (dotenv)
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
<<<<<<< HEAD
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
=======
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
});
// init dynamoclient, define db table
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const MONSTERS_TABLE = process.env.MONSTERS_TABLE;
// monsterdao class that implements imonsterdao interface, includes all db methods
class MonsterDao {
    // gets all monsters from the database
    async getMonsters() {
<<<<<<< HEAD
        const params = { TableName: MONSTERS_TABLE };
=======
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
            ProjectionExpression: '#name, #type, susceptibility, loot',
            ExpressionAttributeNames: {
                '#name': 'name',
                '#type': 'type'
            }
        };
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
        const beasts = await dynamoClient.scan(params).promise();
        return Promise.resolve(beasts.Items);
    }
    // gets all monsters of a certain type from the database
    async getMonstersByType(type) {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
<<<<<<< HEAD
=======
            ScanIndexForward: true,
            ProjectionExpression: '#name, #type, susceptibility, loot',
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeValues: { ':type': type },
            ExpressionAttributeNames: {
                '#type': 'type',
<<<<<<< HEAD
            },
        };
        const monsters = await dynamoClient
            .query(params, (err) => {
            if (err) {
                console.log(err, err.stack);
            }
        })
            .promise();
=======
                '#name': 'name'
            }
        };
        const monsters = await dynamoClient.query(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            }
        }).promise();
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
        return Promise.resolve(monsters.Items);
    }
    // gets a specific monster from the database
    async getOneMonster(name, type) {
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
<<<<<<< HEAD
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
=======
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
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
        return Promise.resolve(monster.Items);
    }
    // adds a new monster to the database
    async addOrUpdateMonster(monster) {
        const params = {
            TableName: MONSTERS_TABLE,
<<<<<<< HEAD
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
=======
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
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
            if (err)
                console.log(err);
            else
                console.log(data);
<<<<<<< HEAD
        })
            .promise();
        Promise.resolve(null);
=======
        }).promise();
        return Promise.resolve(null);
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
    }
}
exports.default = MonsterDao;
