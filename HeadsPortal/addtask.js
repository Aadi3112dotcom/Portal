document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("addTodo");
  const list = document.getElementById("taskList");
  const roleSelect = document.getElementById("assignedTo"); 
  const countSpan = document.getElementById("taskCount");

  const API = "http://localhost:5000/tasks";

  async function loadTasks() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch tasks");

      const tasks = await res.json();

      list.innerHTML = "";

      // Filter: Head sees ONLY tasks assigned by 'head'
      const myTasks = tasks.filter(t => t.assignedBy === "head");

      countSpan.textContent = myTasks.length;

      if (myTasks.length === 0) {
        list.innerHTML = "<li style='text-align:center; color:#888; padding:10px;'>No tasks assigned by you yet.</li>";
      } else {
        myTasks.forEach(task => {
          const li = document.createElement("li");
          li.className = "task-item";
          li.innerHTML = `
            <span class="text">
              <strong>${task.text}</strong> 
              <span style="font-size:0.85em; color:#2563eb;">&rarr; ${task.assignedTo.toUpperCase()}</span>
            </span>
          `;
          list.appendChild(li);
        });
      }
    } catch (err) {
      console.error("Error loading tasks", err);
      countSpan.textContent = "0";
    }
  }

  addBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    const assignedTo = roleSelect.value;

    if (!text) {
      alert("Please enter a task.");
      return;
    }
    if (!assignedTo) {
      alert("Please select a role to assign this task to.");
      return;
    }

    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          assignedBy: "head", 
          assignedTo: assignedTo, 
          domain: "General" 
        })
      });

      input.value = "";
      roleSelect.value = ""; 
      loadTasks();
      
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to assign task. Is the server running?");
    }
  });

  loadTasks();
});