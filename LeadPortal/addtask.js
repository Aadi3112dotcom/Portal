document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const assignToInput = document.getElementById("assignTo");
  const addBtn = document.getElementById("addTodo");
  const list = document.getElementById("taskList");

  const domain = localStorage.getItem("domain");
  const API = "http://localhost:5000/tasks";

  if (!domain) {
    alert("Domain missing. Login again.");
    window.location.href = "../login.html";
    return;
  }

  async function loadTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    list.innerHTML = "";

    tasks
      .filter(t => t.domain === domain && t.assignedBy === "lead")
      .forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.text} → ${task.assignedTo}`;
        list.appendChild(li);
      });
  }

  addBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    const assignedTo = assignToInput.value.trim();

    if (!text || !assignedTo) {
      alert("Fill all fields");
      return;
    }

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

    input.value = "";
    assignToInput.value = "";
    loadTasks();
  });

  loadTasks();
});
