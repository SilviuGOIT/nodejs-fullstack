//https://www.youtube.com/watch?v=cl186ePedMg&ab_channel=Helpfolder -> instalare curl
//https://medium.com/@vikas.taank_40391/everything-that-you-need-to-know-about-oauth2-fb6a29b59e46 -> OAuth
//https://www.youtube.com/watch?v=ZV5yTm4pT8g&ab_channel=ByteByteGo -> despre OAuth , despre proces
//https://frontegg.com/blog/oauth-vs-jwt

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let todos = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Make sport", completed: true },
];

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title, completed } = req.body;

  const newTodo = {
    id: todos.length + 1,
    title,
    completed,
  };
  todos.push(newTodo);
  console.log("After POST: ", todos);
  res.status(201).json(newTodo);
});

// Inlocuieste resursa complet
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  // inlocuit intregul todo
  todos[todoIndex] = { id, title, completed };
  console.log("After PUT: ", todos);
  res.json(todos[todoIndex]);
});

// Inlocuieste resursa partial
app.patch("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(400).json({ message: "Todo not found" });
  }

  if (title !== undefined) {
    todos[todoIndex].title = title;
  }

  if (completed !== undefined) {
    todos[todoIndex].completed = completed;
  }

  console.log("After Patch: ", todos);
  res.json(todos[todoIndex]);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
