document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");

  if (!list) {
    console.error("taskList element not found");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/tasks");
    const tasks = await res.json();

    console.log("Tasks received:", tasks);

    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = "<li>No tasks assigned yet</li>";
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
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
