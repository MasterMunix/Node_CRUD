const express = require('express');
const routes = express.Router();
const Connection = require('./database');



routes.get("/", async (req, res) => {
  const db = await Connection.open();

  db.collection("quotes")
    .find()
    .toArray()
    .then((result) => {
      res.render("index.ejs", { quotes: result });
    })

    .catch((error) => {
      console.log(error);
    });
});

module.exports = routes;