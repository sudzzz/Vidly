const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const genres = [
    {id : 1, name : "Action"},
    {id : 2, name : "Romance"},
    {id : 3, name : "Horror"},
];


app.get('/',(req,res)=>{
    res.send("<h1>Welcome To Vidly</h1>")
})

app.get('/api/genres',(req,res)=>{
    res.send(genres);
});

app.get('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with given id is not found");

    res.send(genre);
})

app.post('/api/genres',(req,res)=>{
    //Validate the genre
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id : genres.length + 1,
        name : req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id',(req,res)=>{
    //Look up the Genre
    //If not present return 404 not found
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with given id is not found");
    
    //Validate
    //If invalid return 400 - Bad request
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Update Genre
    //Return Updated Genre
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id',(req,res)=>{
    //Look up the genre
    //If not found then return 404
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with given id is not found");

    //Delete
    const index = genres.indexOf(genre);
    genres.splice(index,1);

    //Return the same genre
    res.send(genre);

})

function validateGenre(genre) {
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(genre,schema);
}

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});