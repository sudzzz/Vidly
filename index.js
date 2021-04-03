const express = require('express');
const Joi = require('joi');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');

app.set('view engine','pug');
app.set('views','./views'); //default

app.use(express.json());
app.use('/api/genres',genres);
app.use('/',home);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});