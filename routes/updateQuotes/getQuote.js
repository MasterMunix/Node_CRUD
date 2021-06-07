const express = require('express');
const routes = express.Router();
const Connection = require('../database');
const { ObjectID } = require('bson');


//1. We redirect the quotes with their information into a new page where we can edit it
routes.get('/:id', async (req,res) => {
    const db = await Connection.open();
    //To get the object from the url I use req.params.id
    const FindID = await db.collection('quotes').find( { "_id" : ObjectID(req.params.id) } ).toArray();
    if(FindID){
        const result = FindID;
        res.render('edit.ejs', {quotes : result});
    }
})

module.exports = routes;