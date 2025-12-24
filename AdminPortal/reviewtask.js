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

      li.innerHTML = `
        <span class="text">
          ${task.text}<br>
          <small>
            Assigned by: <b>${task.assignedBy}</b> |
            Assigned to: <b>${task.assignedTo}</b>
          </small>
        </span>
      `;

      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = "<li>Error loading tasks</li>";
  }
});
