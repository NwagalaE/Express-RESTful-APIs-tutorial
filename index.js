//const Joi = require('joi');//class
const express = require('express');//returns a function
const Joi = require('joi');

//calling the function
const app = express();

app.use(express.json())

const courses = [
    {id: 1, name: 'English'},
    {id: 2, name: 'Maths'},
    {id: 3, name: 'F/Maths'},
    {id: 4, name: 'Chemistry'},
]

app.get('/', (req,res)=>{
    res.send("Hello World");
});//route handler



app.get('/api/courses', (req,res)=>{
    res.send(courses);
});//route handler



app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');
    res.send(course);
});



app.post('/api/courses', (req,res)=>{
    const {error} = validateCourse(req.body); //result.error
    if(error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})



app.put('api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');

    const {error} = validateCourse(req.body); //result.error
    if(error) return res.status(400).send(result.error.details[0].message);

    //Update course
    course.name = req.body.name
    res.send(course);
});


//validation function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}



app.delete('api/courses/:id', (req,res)=>{
    //Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found')

    
    //Delete
    const index = courses.indexOf(course)
    courses.splice(index,1);

    //Return course
    res.send(course);
});












//PORT
const port = process.env.PORT || 2020;
app.listen(port, ()=>console.log(`Listening on ${port}...`));