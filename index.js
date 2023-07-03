require("dotenv").config();

const cors = require("cors");
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoose = require("mongoose");

const Todo = require("./models/Todo");

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Todo List');
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get a specific todo by ID
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3002, () => {
  console.log('Server listening on port http://localhost:3002/');
});
