document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");
  const API = "http://localhost:5000/tasks";

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to connect to server");

    const tasks = await res.json();

    list.innerHTML = "";

    // FILTER: Tasks I assigned OR Tasks assigned TO me
    const relevantTasks = tasks.filter(
      t => t.assignedBy === "head" || t.assignedTo === "head"
    );

    if (relevantTasks.length === 0) {
      list.innerHTML = "<li class='loading'>No active tasks found for you.</li>";
      return;
    }

    relevantTasks.forEach(task => {
      const li = document.createElement("li");
      li.className = "task-item";

      const fromWho = task.assignedBy ? task.assignedBy.toUpperCase() : "?";
      const toWho = task.assignedTo ? task.assignedTo.toUpperCase() : "?";

      const div = document.createElement("div");
      div.className = "task-content";
      div.innerHTML = `
        <span class="task-text">${task.text}</span>
        <span class="task-meta">
          From: <span class="highlight-role">${fromWho}</span> 
          &rarr; 
          To: <span class="highlight-role">${toWho}</span> 
        </span>
      `;

      li.appendChild(div);

      // DELETE BUTTON: Only for tasks created BY the Head
      if (task.assignedBy === "head") {
        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.innerHTML = "✕";
        delBtn.title = "Delete Task";

        delBtn.addEventListener("click", async () => {
          if (confirm("Delete this task?")) {
            try {
              await fetch(`${API}/${task.id}`, { method: "DELETE" });
              li.remove();
            } catch (e) {
              console.error(e);
              alert("Could not delete task.");
            }
          }
        });
        li.appendChild(delBtn);
      }

      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = "<li class='loading'>Error loading tasks. Is the server running?</li>";
  }
});
