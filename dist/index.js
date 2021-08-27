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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports express and monster controller
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const monster = __importStar(require("./controller/monsterController"));
// intialize express, define port to use, enable json middleware
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(cors_1.default());
app.use(express_1.default.json());
// monsters endpoints
const monstersRouter = express_1.default.Router();
=======
Object.defineProperty(exports, "__esModule", { value: true });
// imports express and monster controller
const express = require("express");
const monster = require("./controller/monsterController");
// intialize express, define port to use, enable json middleware
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// monsters endpoints
const monstersRouter = express.Router();
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
monstersRouter.get('/monsters', monster.getAllMonsters); // calls the getAllMonsters() function from the controller
monstersRouter.get('/monsters/:type', monster.getAllMonstersByType); // calls the getAllMonstersByType() function from the controller
monstersRouter.get('/monsters/:type/:name', monster.getMonster); // calls the getMonster() function from the controller
monstersRouter.post('/monsters', monster.addMonster); // calls the addMonster() function from the controller
<<<<<<< HEAD
monstersRouter.put('/monsters/:type/:name', monster.updateMonster); // calls the updateMonster() function from the controller
monstersRouter.delete('/monsters/:type/:name', monster.deleteMonster); // calls the deleteMonster() function from the controller
// setup base endpoint
app.use(monstersRouter);
=======
monstersRouter.put('/monsters/:id', monster.updateMonster); // calls the updateMonster() function from the controller
monstersRouter.delete('/monsters/:id', monster.deleteMonster); // calls the deleteMonster() function from the controller
// setup base endpoint
app.use('/', monstersRouter);
>>>>>>> 224087c03cc37af7283c47c7fa22d8b2116fccea
// starts server using defined port
app.listen(port, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
