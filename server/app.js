"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express'); // yarn add express
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// const mongoose = require('mongoose');
// import {createHandler} from 'graphql-http/lib/use/express';
// const schema = require("./schema/schema")
const PORT = 3003;
// mongoose.connect('mongodb://admin:admin@localhost:27017/graphql-course')
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.all('/graphql', createHandler({schema}));
//
// const dbConnection = mongoose.connection;
// dbConnection.on('error', (err: any) => console.log(`Connection error: ${err}`));
// dbConnection.once('open', () => console.log('Connected to DB'));
app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
    ;
});
//
// const port = 3003;
// import express, { Express, Request, Response } from 'express';
//
//
// const app: Express = express();
//
// app.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server');
// });
//
// app.listen(port, () => {
//     console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
