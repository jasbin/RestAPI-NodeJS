const Joi = require('joi')
const express = require('express');
const app = express();
app.use(express.json());//responds to post reqest as JSON
const courses = [
    {id: 1, name : 'math'},
    {id: 2, name : 'science'}
];

app.get('/', (req, res) => {
    res.send('CRUD API');
});

app.get('/api/courses/', (req, res) => {
    res.send(courses);
});

app.post('/api/courses/', (req,res)=>{
    const schema = {
        name : Joi.string().min(3).required()
    }
    const course = {
        id : courses.length + 1,  
        name: req.body.name
    };
    const result = Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error);
        return; //so that rest statements will not be executed which are below
    }

    courses.push(course);
    res.send(course);
   
});
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c=> c.id=== parseInt(req.params.id));
    if(!course) res.status(404).send('the given course id is not found');
    res.send(course);
});
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running at port ${port}`));