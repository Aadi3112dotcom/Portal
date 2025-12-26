document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("taskList");
  const domain = localStorage.getItem("domain");

  if (!domain) {
    alert("Domain missing. Login again.");
    window.location.href = "../login.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/tasks");
    const tasks = await res.json();

    list.innerHTML = "";

    const domainTasks = tasks.filter(
      t => t.domain === domain
    );

    if (domainTasks.length === 0) {
      list.innerHTML = "<li>No tasks assigned to your domain</li>";
      return;
    }

    domainTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.text} (from ${task.assignedBy})`;
      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = "<li>Error loading tasks</li>";
  }
});
