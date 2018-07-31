const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json()); //responds to post reqest as JSON
const courses = [{ id: 1, name: "math" }, { id: 2, name: "science" }];

app.get("/", (req, res) => {
  res.send("CRUD API");
});

app.get("/api/courses/", (req, res) => {
  res.send(courses);
});

app.post("/api/courses/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message); //so that rest statements will not be executed which are below
  
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the given course id is not found");
  res.send(course);
});
app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.query);
});

app.put("/api/courses/:id", (req, res) => {
  //look up the course if not exist return 404 resourse not found error
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the given course id is not found");

  //validate course
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message); //so that rest statements will not be executed which are below
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  //look up the course if not exist return 404 error
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the given course id is not found");
  //delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //return the same course
  res.send(course);
});
function validateCourse(course) {
  //validate the structure of the course
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running at port ${port}`));
