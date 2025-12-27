document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");
  const assignBtn = document.getElementById("assignBtn");
  const taskInput = document.getElementById("taskInput");
  const assignToInput = document.getElementById("assignTo");

  const domain = localStorage.getItem("domain");
  const API = "http://localhost:5000/tasks";

  if (!domain) {
    alert("Domain not found. Please login again.");
    window.location.href = "../login.html";
    return;
  }

  async function loadTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    list.innerHTML = "";

   
    const visibleTasks = tasks.filter(t => t.domain === domain);

    if (visibleTasks.length === 0) {
      list.innerHTML = "<li>No tasks yet</li>";
      return;
    }

    visibleTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.text} (from ${task.assignedBy})`;
      list.appendChild(li);
    });
  }

  async function loadAnnouncements() {
  const role = "lead";
  const domain = localStorage.getItem("domain");

  const res = await fetch("http://localhost:5000/announcements");
  const announcements = await res.json();

  const list = document.getElementById("announcementList");
  list.innerHTML = "";

  const visible = announcements.filter(a =>
    (a.targetRole === "all" || a.targetRole === role) &&
    (a.targetDomain === "all" || a.targetDomain === domain)
  );

  if (visible.length === 0) {
    list.innerHTML = "<li>No announcements</li>";
    return;
  }

  visible.forEach(a => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${a.title}</strong><br>
      ${a.description}
      ${a.link ? `<br><a href="${a.link}" target="_blank">Link</a>` : ""}
    `;
    list.appendChild(li);
  });
}

loadAnnouncements();


  assignBtn.addEventListener("click", async () => {
    const text = taskInput.value.trim();
    const assignedTo = assignToInput.value.trim();

    if (!text || !assignedTo) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        assignedBy: "lead",
        assignedTo,
        domain  
      })
    });

    taskInput.value = "";
    assignToInput.value = "";
    loadTasks();
  });

  loadTasks();



});

function logout() {
  localStorage.clear();
  window.location.href = "../login.html";
}
