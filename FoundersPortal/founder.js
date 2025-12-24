document.addEventListener("DOMContentLoaded", async () => {
  // 1. Sidebar Dropdown Logic
  const dropdowns = document.getElementsByClassName("dropdown-btn");
  
  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener("click", function() {
      // Toggle active styling
      this.classList.toggle("active");
      
      // Toggle visibility of the dropdown content
      const dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }

  // 2. Fetch Tasks Logic
  const list = document.getElementById("founderTaskList");
  
  if (list) {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const tasks = await res.json();

      list.innerHTML = "";

      // Logic: Founder sees tasks assigned TO 'head' (monitoring the heads)
      // OR assigned TO 'founder'
      const visibleTasks = tasks.filter(
        task => task.assignedTo === "head" || task.assignedTo === "founder"
      );

      if (visibleTasks.length === 0) {
        list.innerHTML = "<li>No active tasks found</li>";
      } else {
        visibleTasks.forEach(task => {
          const li = document.createElement("li");
          // Displaying the task text
          li.textContent = `${task.text} (Assigned to: ${task.assignedTo.toUpperCase()})`;
          list.appendChild(li);
        });
      }

    } catch (err) {
      console.error("Failed to load tasks:", err);
      // Fallback text if backend is offline
      list.innerHTML = "<li>No tasks available (Offline Mode)</li>";
    }
  }
});

// 3. Logout Logic
function logout() {
  localStorage.clear();
  window.location.href = "../login.html"; 
}