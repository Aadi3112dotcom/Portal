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

      // COUNTER FIX: Show TOTAL tasks in the system for the Founder
      countSpan.textContent = tasks.length;

      // FILTER: Only display tasks assigned by the Founder in the list below
      const founderTasks = tasks.filter(t => t.assignedBy === "founder");

      if (founderTasks.length === 0) {
        list.innerHTML = "<li style='text-align:center; color:#888; padding:10px;'>No tasks assigned by you yet.</li>";
      } else {
        founderTasks.forEach(task => {
          const li = document.createElement("li");
          li.className = "task-item";
          li.innerHTML = `
            <span class="text">
              <strong>${task.text}</strong> 
              <span style="font-size:0.85em; color:#666;">&rarr; ${task.assignedTo.toUpperCase()}</span>
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
          assignedBy: "founder",
          assignedTo: assignedTo,
          domain: "General" // Adding default domain to prevent undefined errors
        })
      });

      input.value = "";
      roleSelect.value = "";
      loadTasks(); // Reload to update counter and list
      
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to assign task. Is the server running?");
    }
  });

  loadTasks();
});