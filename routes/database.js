const express = require('express');
const routes = express.Router();
require('dotenv').config(); //This require the .env file
const MongoClient = require('mongodb').MongoClient;


class Connection {

    static async open () {
       const client = await MongoClient.connect('mongodb+srv://root:1234@cluster0.qtbti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useUnifiedTopology:true})
       const db = client.db("myFirstDatabase");
       return db;
    }
}

module.exports = Connection;