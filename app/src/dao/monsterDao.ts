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
interface IMonsterDao{
    getMonsters: () => Promise<IMonster[]>;
    getOneMonster: (name:string, type:string) => Promise<IMonster[]>;
    getMonstersByType: (type:string) => Promise<IMonster[] | null>;
    addOrUpdateMonster: (monster: IMonster) => Promise<void>;
    deleteMonster: (id:number) => Promise<void>;
}

// monsterdao class that implements imonsterdao interface, includes all database methods
export default class MonsterDao implements IMonsterDao{
    
    // gets all monsters from the database
    public async getMonsters(): Promise<IMonster[]>{
        const params = {
            TableName: MONSTERS_TABLE,
        };

        const beasts = await dynamoClient.scan(params).promise();
        return Promise.resolve(beasts.Items as IMonster[]);
    }

    // gets a specific monster from database
    public async getOneMonster(name:string, type:string): Promise<IMonster[]>{
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: "type-name-index",
            KeyConditionExpression: "#name = :name and #type = :type",
            ExpressionAttributeValues: {
                ":name": name,
                ":type": type
            },
            ExpressionAttributeNames:{
                "#name": "name",
                "#type": "type"
            }
        };

        const monster = await dynamoClient.query(params, (err) => { 
            if (err){ console.log(err, err.stack); }
        }).promise();

        return Promise.resolve(monster.Items as IMonster[]);
    }

    // gets all monsters of a certain type from the database
    public async getMonstersByType(type:string): Promise<IMonster[] | null>{
        const params = {
            TableName: MONSTERS_TABLE,
            IndexName: 'type-name-index',
            ScanIndexForward: false,
            ExpressionAttributeValues: {":type": type },
            ExpressionAttributeNames:{"#type": "type"},
            KeyConditionExpression: "#type = :type"
        };

        const beasts = await dynamoClient.query(params, (err, data) => {
            if (err){ console.log(err, err.stack); }
        }).promise();

        return Promise.resolve(beasts.Items as IMonster[]);
    }

    // gets specific monster from database
    public async getMonsterById(id:number): Promise<IMonster[]>{
        const params = {
            TableName: MONSTERS_TABLE,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeValues: {
                ":id": id,
            },
            ExpressionAttributeNames:{
                "#id": "id",
            }
        };
        
        const monster = await dynamoClient.query(params, (err, data) => { 
            if (err){ console.log(err, err.stack); }
        }).promise();

        return Promise.resolve(monster.Items as IMonster[]);
    }
    
    // adds a new monster to the database
    public async addOrUpdateMonster(monster:IMonster){
        const params = {
            TableName: MONSTERS_TABLE,
            Item: monster
        };

        await dynamoClient.put(params).promise();
        return Promise.resolve(null);
    }    
    
    // deletes a monster from the database
    public async deleteMonster(monsterId:number){
        const params = {
            TableName: MONSTERS_TABLE,
            Key: { id: monsterId }
          };

         await dynamoClient.delete(params, function(err, data) {
            if (err) console.log(err);
            else console.log(data);
          }).promise();

          return Promise.resolve(null);
    }
}