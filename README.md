# Node.js_CRUD 

My code starts as follows: 

- **server.js** is the entry point followed, starting with the port 5000.

- I added some routes to the server.js as requires, and they do the essentials of a CRUD Application as: 
  - **createQuote.js**: Create.
  - **readQuotes.js**: brings all quotes from the db (In this case MongoDB) to the page.
  - I used two routes for the update that are in the _updateQuotes folder_, the first one is: 
    - **getQuote.js**: It bring the selected quote from database to being editable.
    - **updateQuote**: It updates the selected quote.
  - **deleteQuote.js**: it deletes the selected quote from the database.  
  
  # LIVE EXAMPLE: https://node-crud-wxdq.onrender.com/

***Learning Node.js, so enjoy it!***
---

## Source

I made this CRUD following some explanations told on : <https://zellwk.com/blog/crud-express-mongodb/> and add some good practices for best perfomance and legibility. 


