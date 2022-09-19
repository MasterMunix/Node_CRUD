const express = require('express');
const routes = express.Router();


routes.post("/", async (req, res) => {

    const db = await Connection.open();

    const quotesCollection =  db.collection('quotes');
    await quotesCollection.insertOne(req.body); // This inserts the req.body into the collection that is created 
    res.redirect("/");
})