const express = require('express');
const Joi = require('joi');

const app =  express();

app.use(express.json());//middleware function


const genres = [
    {id : 1, genre: 'Action'},
    {id : 2, genre: 'Thriller'},
    {id : 3, genre: 'Comedy'},
    {id : 4, genre: 'Horror'},
    {id : 5, genre: 'Romance'}
]

app.get('/', (req,res)=>{
    res.send("What's up world?");
});


app.get('/api/genres', (req,res)=>{
    res.send(genres);
});


app.get('/api/genres/:id', (req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found");
    res.send(genre)
});


app.post('/api/genres', (req,res)=>{
    const {error} = validation(req.body);
    if(error) return res.status(404).send(result.error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name : req.params.name
    };
    genres.push(genre);
    res.send(genre);
});


//validation function
function validation(genre) {
    const schema = {
        genre : Joi.string().min(6).required()
    };
    return Joi.validate(genre, schema);
}



app.put('api/genres/:id', (req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Course not found');
   

    const {error} = validation(req.body); //result.error
    if(error) return res.status(400).send(result.error.details[0].message);

    //Update course
    genre.name = req.body.name
    res.send(genre);
    //Return updated course
});



app.delete('api/genre/:id', (req,res)=>{
    //Look up the course
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    //Not existing return 404
    const {error} = validation(req.body); //result.error
    if(error) return res.status(400).send(result.error.details[0].message);
    res.send(genre)
    

    //Delete
    const index = genres.indexOf(genre)
    genres.splice(index,1);

    //Return course
    res.send(course);
});







//PORT
const port = process.env.PORT || 2500;
app.listen(port, ()=>console.log(`Listening on ${port} ...`));