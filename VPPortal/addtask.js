document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("addTodo");
  const list = document.getElementById("taskList");

  const API = "http://localhost:5000/tasks";

  async function loadTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    list.innerHTML = "";

    // VP sees tasks assigned by admin or VP
    tasks
      .filter(
        t => t.assignedBy === "admin" || t.assignedBy === "vp"
      )
      .forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.text} → ${task.assignedTo}`;
        list.appendChild(li);
      });
  }

  addBtn.addEventListener("click", async () => {
    const text = input.value.trim();

    // VP can only assign to LEAD or MEMBER
    const assignedTo = document.getElementById("assignTo").value;

    if (!text || !assignedTo) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        assignedBy: "vp",
        assignedTo   // must be "lead" or "member"
      })
    });

    input.value = "";
    loadTasks();
  });

  loadTasks();
});
