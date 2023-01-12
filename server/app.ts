const express = require('express'); // yarn add express
const cors = require('cors')
import {createHandler} from 'graphql-http/lib/use/express';

const schema = require("../schema/schema")
const PORT = 3005;
// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
const app = express();
app.use(cors())
app.all('/graphql', createHandler({schema}));

app.listen(PORT, (err: any) => {
    err ? console.log(err) : console.log("Server started on port: " + PORT);
})