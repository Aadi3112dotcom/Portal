const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) window.location.href = "login.html";
