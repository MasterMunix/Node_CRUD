// console.log('May Node be with you')

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //Body parser is a middleware that allows express to take the values from the index.html, I installed via npm as a package
const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('bson');

//Using EJS template
app.set('view engine', 'ejs')




//Midlewares and  other routes here...    
app.use(express.urlencoded({extended: true})); //We can use body-parser with the method 'use'
app.use(express.json())

app.listen(5000, function() {//Change this from 3000 to 5000 to use get docker started 
    console.log('listening on 3000');
});





//Create the mongoclient 
MongoClient.connect('mongodb+srv://root:1234@cluster0.qtbti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useUnifiedTopology:true},  (err, client) => {//This is the connection string
    if(err) 
    {
      return err;
    }
    console.log("Conected to Database")
    //Create a Quote 
    const db = client.db("myFirstDatabase") // This intances the data base 
    const quotesCollection = db.collection('quotes') // This create the collection into the database 
    app.post("/quotes", (req, res) => {
        quotesCollection.insertOne(req.body) // This inserts the req.body into the collection that is created 
            .then(result => {
                
            })
         res.redirect("/");
    })

    //READ A QUOTE

    app.get("/", (req, res) => {
        db.collection('quotes').find().toArray()
            .then(result => { 
                
                res.render('index.ejs', {quotes: result} )
                
            })

            .catch(error => {
                console.log(error)
            })
            
    })
    //UPDATE A QUOTE 
    //1. We redirect the quotes with their information into a new page where we can edit it
    app.get('/views/edit.ejs/:id', (req,res) => {
       
        //To get the object from the url I use req.params.id
        db.collection('quotes').find( { "_id" : ObjectID(req.params.id) } ).toArray()
            .then(result => { //then I use the objectID to bring the data
             //  console.log(result);
                res.render('edit.ejs', {quotes : result})
            })

    })
    //2. We send the HTTP Post to the URL below and we select the id and perform the update
    app.post("/update/:id", (req, res) => {
        
        quotesCollection.updateOne(//updateOne(1. where to change, 2. what to change, 3. I dont know :) )
            { "_id" : ObjectID(req.params.id) }, //First we write the ID's object that we want to update
            {$set: {"name": req.body.name, quote: req.body.quote }} //second we set the values taht we want to change
        ).then(result => {
           
        })
        .catch(err => {
            console.log(err);
        })
        
         res.redirect('/');
    })
  
    //DELETE A RECORD OR A DOCUMENT
    app.get('/delete/:id', (req, res) => {
        quotesCollection.deleteOne(
            { "_id" : ObjectID(req.params.id) }
            
            )
        res.redirect('/');
    });

})



/* app.get(endpoint, callback) ENDPOINT:
It’s the value that comes after your domain name.
You’re reading this article on
https://zellwk.com/blog/crud-express-mongodb/.
The domain name is zellwk.com.
The requested endpoint is anything that comes after zellwk.com
 (which is /blog/crud-express-mongodb).
callback tells the server what to do when the requested endpoint matches the endpoint stated.
It takes two arguments: A request object and a response object.
*/


//Using the public folder 
app.use(express.static('public'))


//All the CRUD handlers are here...
//Handle the post request I used in the form of index.html




// app.get("/", (req, res) => {//The endpoint is '/', We normally abbreviate `request` to `req` and `response` to `res`.
//     res.sendFile(__dirname + "/index.html");
//     /*dirname is the actual directory of my project,
//     it is: C:\Users\DELL\Downloads\Programacion\Javascript\NodeJS\CRUD_NodeJS>*/
//     //senFile() sends a file as a response and takes the direction of the file
// });


