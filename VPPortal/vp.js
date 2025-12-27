document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");
  const API = "http://localhost:5000/tasks/vp";

  try {
    const res = await fetch(API);
    const tasks = await res.json();

    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = "<li>No tasks assigned</li>";
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
      list.appendChild(li);
    });

  } catch (err) {
    list.innerHTML = "<li>Backend not running</li>";
  }

  async function loadAnnouncements() {
  const role = "vp";

  const res = await fetch("http://localhost:5000/announcements");
  const announcements = await res.json();

  const list = document.getElementById("announcementList");
  list.innerHTML = "";

  const visible = announcements.filter(a =>
    a.targetRole === "all" || a.targetRole === role
  );

  if (visible.length === 0) {
    list.innerHTML = "<li>No announcements</li>";
    return;
  }

  visible.forEach(a => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${a.title}</strong><br>${a.description}`;
    list.appendChild(li);
  });
}

loadAnnouncements();

});

function logout() {
  window.location.href = "../login.html";
}
