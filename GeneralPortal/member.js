// Sidebar dropdown expand-collapse
var dropdownButtons = document.getElementsByClassName("dropdown-btn");

for (let i = 0; i < dropdownButtons.length; i++) {
    dropdownButtons[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var dropdownContent = this.nextElementSibling;

        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../login.html"; // Redirect to registration or login page
}
