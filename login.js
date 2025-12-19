document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("loginForm not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!data.success) {
        error.textContent = "Invalid username or password";
        return;
      }

      if (data.role === "admin") {
        window.location.href = "AdminPortal/admin.html";
      } else {
        window.location.href = "GeneralPortal/member.html";
      }

    } catch (err) {
      error.textContent = "Backend not running";
    }
  });
});
