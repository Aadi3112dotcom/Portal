document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");
  const API = "http://localhost:5000/tasks";

  const res = await fetch(API);
  const tasks = await res.json();

  list.innerHTML = "";

  const vpTasks = tasks.filter(t => t.assignedTo === "vp");

  if (vpTasks.length === 0) {
    list.innerHTML = "<li>No tasks assigned</li>";
    return;
  }

  vpTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.text} (from ${task.assignedBy})`;
    list.appendChild(li);
  });
});
