const mongoose = require('mongoose');
require('dotenv').config(); //This require the .env file

const { Schema } = mongoose;
const crypto = require('crypto');//require crypto module


//connect to database 
mongoose.connect(process.env.CONNECTION_STRING, { dbName: process.env.DATABASE}).catch(error => handleError(error));
mongoose.connection.on('connected', () =>
console.log("conectado por moongose"));

//Schema for the user
const userSchema = new Schema({

    username: { type: String, required: true },
    email: { type: String, required: true },
    hash: String,
    salt: String
});

// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = function (password) {

    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations, 
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
        1000, 64, `sha512`).toString(`hex`); 
};

// Method to check the entered password is correct or not 
userSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 


// Exporting module to allow it to be imported in other files 
const User = mongoose.model('User', userSchema, "user"); 
User.createCollection();
module.exports = User;
