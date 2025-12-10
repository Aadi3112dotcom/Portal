document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // prevents form refresh

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("error");

    // Example fixed login credentials
    if (username === "admin" && password === "12345") {
        window.location.href = "AdminPortal/admin.html"; // redirect page
    } else {
        error.textContent = "Invalid username or password!";
    }
    if (username === "member" && password === "12345") {
        window.location.href = "GeneralPortal/member.html"; // redirect page
    } else {
        error.textContent = "Invalid username or password!";
    }
});
