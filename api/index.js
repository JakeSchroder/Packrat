const express = require('express');
const bodyParser = require('body-parser');
const {products} = require('./src/routes');
const mongoose = require('mongoose');
const path = require('path');

// Connect to MongoDB
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

// Assign header value for CORS
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());
app.use(products);


// Serve UI to the client
if(process.env.ENVIRONMENT === 'production'){
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));