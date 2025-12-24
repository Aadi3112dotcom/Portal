document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  if (!role || role !== "vp") {
    alert("Unauthorized access");
    window.location.href = "../login.html";
    return;
  }

  document.getElementById("role").textContent = role;
  document.getElementById("username").textContent = username || "vp";
});
