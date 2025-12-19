const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// USERS
const users = [
  { username: "admin", password: "12345", role: "admin" },
  { username: "member", password: "12345", role: "member" }
];

// TASK STORAGE
let tasks = [];

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.json({ success: false });
  }
});

// ADD TASK
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Task text required" });

  const newTask = { id: Date.now(), text, done: false };
  tasks.push(newTask);
  res.json(newTask);
});

// GET TASKS
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// DELETE TASK
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: "Task deleted" });
});

// SERVER
app.listen(5000, () => {
  console.log("Server Started on http://localhost:5000");
});
