document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");
  const API = "http://localhost:5000/tasks";

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch tasks");

    const tasks = await res.json();

    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = "<li class='loading'>No active tasks found in the system.</li>";
      return;
    }

    // Founder sees ALL tasks in the system
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = "task-item";

      // Handle missing data gracefully
      const domainInfo = task.domain ? `(${task.domain})` : "";
      const assignedBy = task.assignedBy ? task.assignedBy.toUpperCase() : "UNKNOWN";
      const assignedTo = task.assignedTo ? task.assignedTo.toUpperCase() : "UNKNOWN";

      const div = document.createElement("div");
      div.className = "task-content";
      
      div.innerHTML = `
        <span class="task-text">${task.text}</span>
        <span class="task-meta">
          From: <span class="highlight-role">${assignedBy}</span> 
          &rarr; 
          To: <span class="highlight-role">${assignedTo}</span> 
          ${domainInfo}
        </span>
      `;

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.innerHTML = "&times;"; 
      delBtn.title = "Delete Task";

      // Delete Functionality
      delBtn.addEventListener("click", async () => {
        if(confirm("Are you sure you want to delete this task?")) {
          try {
            await fetch(`${API}/${task.id}`, { method: "DELETE" });
            li.remove();
          } catch (e) {
            console.error("Delete failed", e);
            alert("Failed to delete task.");
          }
        }
      });

      li.appendChild(div);
      li.appendChild(delBtn);
      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = "<li class='loading'>Error loading tasks. Is the server running?</li>";
  }
});