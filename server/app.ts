const express = require('express'); // yarn add express
const cors = require('cors')
const mongoose = require('mongoose');

import {createHandler} from 'graphql-http/lib/use/express';


const schema = require('./schema/schema');

const PORT = 3003;

mongoose.connect('mongodb://admin:admin@localhost:27017/graphql-course')


const app = express();
app.use(cors())
app.all('/graphql', createHandler({schema}));

const dbConnection = mongoose.connection;

dbConnection.on('error', (err: any) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB'));

app.listen(PORT, (err: any) => {
    err ? console.log(err) : console.log("Server started on port: " + PORT);
})