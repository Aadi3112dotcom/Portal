document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");

  if (!list) {
    console.error("taskList element not found");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/tasks");
    const tasks = await res.json();

    list.innerHTML = "";

    // ✅ Member sees tasks assigned by Admin or VP
    const visibleTasks = tasks.filter(
      task =>
        task.assignedTo === "member" &&
        (task.assignedBy === "admin" || task.assignedBy === "vp")
    );

    if (visibleTasks.length === 0) {
      list.innerHTML = "<li>No tasks assigned yet</li>";
      return;
    }

    visibleTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.text} (Assigned by ${task.assignedBy.toUpperCase()})`;
      list.appendChild(li);
    });

  } catch (err) {
    console.error("Failed to load tasks:", err);
    list.innerHTML = "<li>Error loading tasks</li>";
  }
});

function logout() {
  localStorage.clear();
  window.location.href = "../login.html";
}
