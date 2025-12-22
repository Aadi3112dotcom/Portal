const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// USERS
const users = [
  { username: "admin", password: "12345", role: "admin" },
  { username: "vp", password: "12345" , role: "vp" },
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
  const { text, assignedBy, assignedTo } = req.body;

  if (!text || !assignedBy || !assignedTo) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newTask = {
    id: Date.now(),
    text,
    assignedBy,
    assignedTo,
    done: false
  };

  tasks.push(newTask);
  res.json(newTask);
});


// GET TASKS
app.get("/tasks/:role", (req, res) => {
  const role = req.params.role;
  const filtered = tasks.filter(t => t.assignedTo === role);
  res.json(filtered);
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
