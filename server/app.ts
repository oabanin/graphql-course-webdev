import express, {Application} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {createHandler} from "graphql-http/lib/use/express";
import schema from "./schema/schema";
import {Request, Response} from 'express';

const PORT = 3003;

mongoose.connect('mongodb://admin:admin@localhost:27017/graphql-course')


const app = express();
app.use(cors())
app.all('/graphql', createHandler({schema}));

const dbConnection = mongoose.connection;

dbConnection.on('error', (err: any) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB'));

app.get('/test', (req: Request, res: Response ) => {
     res.status(401).send({test: 'Text'})
})

app.listen(PORT, () => {
     console.log("Server started on port: " + PORT);
})