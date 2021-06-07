const express = require('express');
const routes = express.Router();
const Connection = require('./database');
const { ObjectID } = require('bson');



routes.get("/:id", async (req, res) => {
    const db = await Connection.open();
    const quotesCollection = db.collection('quotes');
    const deleteQuote = await quotesCollection.deleteOne({ _id: ObjectID(req.params.id) });
    res.redirect("/");
  });

  module.exports = routes;