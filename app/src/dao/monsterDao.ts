// imports all from aws-sdk, imonster interface, and dotenv config
import * as AWS from 'aws-sdk';
import { IMonster } from '../entities/Monster';
import { config } from 'dotenv';
config();

// configure aws for access using environment variables (dotenv)
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// init dynamoclient, define db table
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const MONSTERS_TABLE = process.env.MONSTERS_TABLE;
 
// monsterdao interface, defines functions for the class
interface IMonsterDao {
    getMonsters: () => Promise<IMonster[]>;
    getOneMonster: (name:string, type:string) => Promise<IMonster[]>;
    getMonstersByType: (type:string) => Promise<IMonster[] | null>;
    addOrUpdateMonster: (monster: IMonster) => Promise<void>;
    deleteMonster: (type:string, name:string) => Promise<void>;
}

// monsterdao class that implements imonsterdao interface, includes all db methods
export default class MonsterDao implements IMonsterDao {
    
    // gets all monsters from the database
    public async getMonsters(): Promise<IMonster[]>{
        const params = { TableName: MONSTERS_TABLE };

        const beasts = await dynamoClient.scan(params).promise();
        return Promise.resolve(beasts.Items as IMonster[]);
    }

    // gets all monsters of a certain type from the database
    public async getMonstersByType(type:string): Promise<IMonster[] | null> {
        const params = {
            TableName: MONSTERS_TABLE,
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeValues: {':type': type },
            ExpressionAttributeNames:{
                '#type': 'type',
            }
        };

        const monsters = await dynamoClient.query(params, (err, data) => {
            if (err){ console.log(err, err.stack); }
        }).promise();

        return Promise.resolve(monsters.Items as IMonster[]);
    }

    // gets a specific monster from the database
    public async getOneMonster(name:string, type:string): Promise<IMonster[]> {
        const params = {
            TableName: MONSTERS_TABLE,
            KeyConditionExpression: '#name = :name and #type = :type',
            ExpressionAttributeValues: {
                ':name': name,
                ':type': type
            },
            ExpressionAttributeNames:{
                '#name': 'name',
                '#type': 'type'
            }
        };

        const monster = await dynamoClient.query(params, (err) => { 
            if (err){ console.log(err, err.stack); }
        }).promise();

        return Promise.resolve(monster.Items as IMonster[]);
    }

    // gets monster by id from the database
    public async checkIfMonsterExists(type, name): Promise<IMonster[]> {
        const params = {
            TableName: MONSTERS_TABLE,
            KeyConditionExpression: '#name = :name and #type = :type',
            ExpressionAttributeValues: {
                ':name': name,
                ':type': type
            },
            ExpressionAttributeNames:{
                '#name': 'name',
                '#type': 'type'
            }
        };
        
        const monster = await dynamoClient.query(params, (err, data) => { 
            if (err){ console.log(err, err.stack); }
        }).promise();

        return Promise.resolve(monster.Items as IMonster[]);
    }
    
    // adds a new monster to the database
    public async addOrUpdateMonster(monster:IMonster) {
        const params = {
            TableName: MONSTERS_TABLE,
            Item: monster
        };

        await dynamoClient.put(params).promise();
        Promise.resolve(null);
    }    
    
    // deletes a monster from the database
    public async deleteMonster(type, name) {
        const params = {
            TableName: MONSTERS_TABLE,
            Key: { 'type': type, 'name': name },
          };

        await dynamoClient.delete(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
        }).promise();

        Promise.resolve(null);
    }
}