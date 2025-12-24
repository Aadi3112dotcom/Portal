document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");

  try {
    const res = await fetch("http://localhost:5000/tasks");
    const tasks = await res.json();

    list.innerHTML = "";

    const visibleTasks = tasks.filter(
      t =>
        t.assignedTo === "member" &&
        (t.assignedBy === "admin" || t.assignedBy === "vp")
    );

    if (visibleTasks.length === 0) {
      list.innerHTML = "<li>No tasks assigned yet</li>";
      return;
    }

    visibleTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.text} (by ${task.assignedBy})`;
      list.appendChild(li);
    });

  } catch (err) {
    list.innerHTML = "<li>Backend not running</li>";
  }
});
