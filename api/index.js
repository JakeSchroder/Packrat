const express = require('express');
const bodyParser = require('body-parser');
const {products} = require('./src/routes');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

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
app.use(bodyParser.json());
app.use(products);

app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
})

if(process.env.ENVIRONMENT === 'production'){
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));