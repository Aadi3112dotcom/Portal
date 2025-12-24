document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");
  const assignBtn = document.getElementById("assignBtn");
  const taskInput = document.getElementById("taskInput");

  const domain = localStorage.getItem("domain"); // web / ai / creatives etc
  const API = "http://localhost:5000";

  if (!domain) {
    console.error("Domain not found for lead");
    return;
  }

  async function loadTasks() {
    const res = await fetch(`${API}/tasks/role/${domain}`);
    const tasks = await res.json();

    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = "<li>No tasks yet</li>";
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.text} (from ${task.assignedBy})`;
      list.appendChild(li);
    });
  }

  assignBtn.addEventListener("click", async () => {
    const text = taskInput.value.trim();
    if (!text) return;

    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        assignedBy: "lead",
        assignedTo: domain
      })
    });

    taskInput.value = "";
    loadTasks();
  });

  loadTasks();
});

function logout() {
  localStorage.clear();
  window.location.href = "../login.html";
}
