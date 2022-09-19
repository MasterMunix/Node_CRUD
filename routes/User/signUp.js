/*
Importing Modules
*/
const express = require('express');
const routes = express.Router();



/*
Importing user schema
*/

const User = require('/Programacion/NodeJS/Node_CRUD/models/user');


// User signup api 

routes.post("/", async (req, res) => {
    
    // Creating empty user object 
    let newUser = new User();

    // Initialize newUser object with request data 
    newUser.username = req.body.name,

        newUser.email = req.body.email,

        newUser.password = req.body.password

    // Call setPassword function to hash password 
    newUser.setPassword(req.body.password);


    newUser.save((err, User) => {
        if (err) {
            return res.status(400).send({
                message: "Failed to add user.",
                error: err
            });
        }
        else {
            return res.status(201).send({
                message: "User added successfully.",
                user: User
            });
        }
    });
});

module.exports = routes;