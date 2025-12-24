document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");
  const API = "http://localhost:5000/tasks";

  try {
    const res = await fetch(API);
    const tasks = await res.json();

    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = "<li>No tasks found</li>";
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = "task-item";

      const span = document.createElement("span");
      span.className = "text";
      span.textContent =
        `${task.text} | by: ${task.assignedBy} → ${task.assignedTo} (${task.domain})`;

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.textContent = "✕";

      delBtn.addEventListener("click", async () => {
        await fetch(`${API}/${task.id}`, { method: "DELETE" });
        li.remove();
      });

      li.appendChild(span);
      li.appendChild(delBtn);
      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = "<li>Error loading tasks</li>";
  }
});
