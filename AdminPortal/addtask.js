document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("addTodo");
  const list = document.getElementById("taskList");
  const countEl = document.getElementById("taskCount");

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
        span.textContent = task.text;

        // visual toggle only
        span.addEventListener("click", () => {
          span.classList.toggle("done");
        });

        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.textContent = "✕";

        // ✅ REAL DELETE (backend)
        delBtn.addEventListener("click", async () => {
          await fetch(`${API}/${task.id}`, {
            method: "DELETE"
          });
          loadTasks(); // re-fetch updated list
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
      });
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  }

  addBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    input.value = "";
    loadTasks();
  });

  loadTasks();
});
