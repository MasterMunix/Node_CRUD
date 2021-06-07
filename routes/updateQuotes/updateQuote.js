const express = require('express');
const routes = express.Router();
const Connection = require('../database');
const { ObjectID } = require('bson');



//2. We send the HTTP Post to the URL below and we select the id and perform the update
routes.post("/:id", async (req, res) => {

    const db = await Connection.open();
    const quotesCollection = db.collection('quotes');
    const updated = await quotesCollection.updateOne(//updateOne(1. where to change, 2. what to change, 3. I dont know :) )
        { "_id" : ObjectID(req.params.id) }, //First we write the ID's object that we want to update
        {$set: {"name": req.body.name, quote: req.body.quote }} //second we set the values taht we want to change
    );
     res.redirect('/');
})

module.exports = routes;