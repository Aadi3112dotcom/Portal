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
});

function logout() {
  window.location.href = "../login.html";
}
