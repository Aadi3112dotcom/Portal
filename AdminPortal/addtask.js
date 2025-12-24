document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("addTodo");
  const list = document.getElementById("taskList");
  const countEl = document.getElementById("taskCount");
  const assignedToSelect = document.getElementById("assignedTo");

  const API = "http://localhost:5000/tasks";

  async function loadTasks() {
    try {
      const res = await fetch(API);
      const tasks = await res.json();

      list.innerHTML = "";
      countEl.textContent = tasks.length;

      if (tasks.length === 0) {
        list.innerHTML = "<li>No tasks yet</li>";
        return;
      }

      tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        const span = document.createElement("span");
        span.className = "text";
        span.textContent = `${task.text} → ${task.assignedTo}`;

        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.textContent = "✕";

        delBtn.addEventListener("click", async () => {
          await fetch(`${API}/${task.id}`, { method: "DELETE" });
          loadTasks();
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
      });
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  }

  // ✅ ADD TASK (WORKING)
  addBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    const assignedTo = assignedToSelect.value;

    if (!text || !assignedTo) {
      alert("Please enter task and select role");
      return;
    }

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        assignedBy: "admin",
        assignedTo
      })
    });

    if (!res.ok) {
      alert("Failed to add task");
      return;
    }

    input.value = "";
    assignedToSelect.value = "";
    loadTasks();
  });

  loadTasks();
});
