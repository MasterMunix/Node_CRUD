const express = require('express');
const routes = express.Router();
require('dotenv').config(); //This require the .env file
const MongoClient = require('mongodb').MongoClient;


class Connection {

    static async open () {
       const client = await MongoClient.connect(process.env.CONNECTION_STRING, {useUnifiedTopology:true})
       const db = client.db(process.env.DATABASE);
       return db;
    }
}

module.exports = Connection;