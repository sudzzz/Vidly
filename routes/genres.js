const express = require('express');
const router = express.Router();
const { Genre,validate } = require('../models/genre');
const mongoose = require('mongoose');
const Joi = require('joi');

/*const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    }
});

const Genre = new mongoose.model('Genre',genreSchema);*/

//OR

/*const Genre = new mongoose.model('Genre',new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    }
}));*/


router.get('/',async (req,res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send("The genre with given id is not found");

    res.send(genre);
})

router.post('/',async (req,res)=>{
    //Validate the genre
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name : req.body.name });
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id',async (req,res)=>{

    //Validate
    //If invalid return 400 - Bad request
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Look up the Genre and update
    //If not present return 404 not found
    const genre = await Genre.findByIdAndUpdate(req.params.id,{name : req.body.name},{
        new : true
    });
    if(!genre) return res.status(404).send("The genre with given id is not found");
    res.send(genre);
});

router.delete('/:id',async (req,res)=>{

    //Look up the genre and Remove
    //If not found then return 404
    const genre = await Genre.findByIdAndRemove(req.params.id)
    
    if(!genre) return res.status(404).send("The genre with given id is not found");

    //Return the same genre
    res.send(genre);

})

module.exports = router;