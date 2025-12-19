document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("addTodo");
  const list = document.getElementById("taskList");
  const countEl = document.getElementById("taskCount");

  async function loadTasks() {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const tasks = await res.json();

      list.innerHTML = "";
      countEl.textContent = tasks.length;

      if (tasks.length === 0) {
        list.innerHTML = "<li>No tasks yet</li>";
        return;
      }

      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const span = document.createElement("span");
        span.className = "text";
        span.textContent = task.text;

        // toggle done
        span.addEventListener("click", () => {
          span.classList.toggle("done");
        });

        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.textContent = "✕";

        delBtn.addEventListener("click", () => {
          li.remove();
          countEl.textContent = list.children.length;
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

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    input.value = "";
    loadTasks();
  });

  loadTasks();
});
