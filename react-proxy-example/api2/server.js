const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3070;

// place holder for the data
const todos = [{
  todo: "산책하기",
  category: "운동",
  isComplete: true
  }];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api2/todos', (req, res) => {
  console.log('api/todos called!')
  res.json(todos);
});

app.post('/api2/todo', (req, res) => {
  const todo = req.body.todo;
  console.log('Adding user:::::', todo);
  todos.push(todo);
  res.json("todo added!");
});

app.get('/', (req,res) => {
  res.send(`<h1>API Running on the port ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});