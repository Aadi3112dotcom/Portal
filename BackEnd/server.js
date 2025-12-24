const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// USERS
const users = [
  { username: "admin", password: "12345", role: "admin" },
  { username: "vp", password: "12345", role: "vp" },
  { username: "member", password: "12345", role: "member" },
  { username: "head", password: "12345", role: "head" },

  { username: "web_lead", password: "12345", role: "lead", domain: "web" },
  { username: "ai_lead", password: "12345", role: "lead", domain: "ai" },
  { username: "creative_lead", password: "12345", role: "lead", domain: "creatives" },
  { username: "app_lead", password: "12345", role: "lead", domain: "app" },
  { username: "cloud_lead", password: "12345", role: "lead", domain: "cloud" }
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
    res.json({
      success: true,
      role: user.role,
      domain: user.domain || null
    });
  } else {
    res.json({ success: false });
  }
});

// ADD TASK
app.post("/tasks", (req, res) => {
  console.log("Received task:", req.body);
  const { text, assignedBy, assignedTo, domain } = req.body;

  if (!text || !assignedBy || !assignedTo) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newTask = {
    id: Date.now(),
    text,
    assignedBy,
    assignedTo,
    domain: domain || "all",
    done: false
  };

  tasks.push(newTask);
  res.json(newTask);
});

// GET  TASK
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// DELETE TASK
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: "Task deleted" });
});


 
app.listen(5000, () => {
  console.log("Server Started on http://localhost:5000");
});
