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
  const list = document.getElementById("headTaskList");
  
  if (list) {
    try {
      // Assuming your backend is running on port 5000
      const res = await fetch("http://localhost:5000/tasks");
      const tasks = await res.json();

      list.innerHTML = "";

      // Logic: Show tasks assigned TO the Head role
      const visibleTasks = tasks.filter(
        task => task.assignedTo === "head"
      );

      if (visibleTasks.length === 0) {
        list.innerHTML = "<li>No tasks assigned</li>";
      } else {
        visibleTasks.forEach(task => {
          const li = document.createElement("li");
          li.textContent = task.text;
          list.appendChild(li);
        });
      }

    } catch (err) {
      console.error("Failed to load tasks:", err);
      // Fallback text if backend is offline
      list.innerHTML = "<li>No tasks assigned (Offline Mode)</li>";
    }
  }

  async function loadAnnouncements() {
  const role = "head";

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

// 3. Logout Logic
function logout() {
  localStorage.clear();
  window.location.href = "../login.html"; 
}