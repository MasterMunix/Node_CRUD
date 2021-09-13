const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //Body parser is a middleware that allows express to take the values from the index.html, I installed via npm as a package

//Using EJS template
app.set('view engine', 'ejs')

//Midlewares and  other routes here...    
app.use(express.urlencoded({extended: true})); //We can use body-parser with the method 'use'
app.use(express.json())
    //routes
    const create = require('./routes/createQuote');
    const read = require('./routes/readQuotes');
    const getQuote = require('./routes/updateQuotes/getQuote');
    const updateQuote = require('./routes/updateQuotes/updateQuote');
    const deleteQuote = require('./routes/deleteQuote');

//Start app
/*app.listen(5000, function() {//Change this from 3000 to 5000 to use get docker started 
    console.log('listening on 3000');
   
});*/
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);


  //Create a Quote
  app.use("/quotes", create);

  //READ A QUOTE
  app.use("/", read);

  //UPDATE A QUOTE
  //1. We redirect the quotes with their information into a new page where we can edit it
  app.use("/views/edit.ejs", getQuote);
  //2. We send the HTTP Post to the URL below and we select the id and perform the update
  app.use("/update", updateQuote);
  //DELETE A RECORD OR A DOCUMENT
 
  //new 
  app.use('/delete', deleteQuote);




