const express = require('express');
const mongoose = require('mongoose');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');

app.set('view engine','pug');
app.set('views','./views'); //default

mongoose.connect('mongodb://localhost/vidly')
  .then(()=> console.log("Connected to MongoDb..."))
  .catch(err => console.error("Couldnot connect to mongoDB",err));

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/',home);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});