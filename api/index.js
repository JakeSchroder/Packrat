require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./src/config/config');
const {products} = require('./src/routes');
const mongoose = require('mongoose');


const mongoString = process.env.DATABASE_URL
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
app.use(cors());
app.use(products);

const port = config.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));