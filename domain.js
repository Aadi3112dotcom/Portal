const members = {
    web: ["Arihant Jain (Head)", "Nikhil (Lead)", "Aaditya Srivastava (Member)"],
    creatives: ["Srushitha (Head)", "Johan (Lead)"],
    ai: ["Aditya Khandelwal (Head)", "Krishna Banik (Lead)"],
    corporate: ["Pulkit (Head)", "Ayush Dwiwedy (Lead)", "Ananya Rana (Lead)"]
};

function showMembers() {
    const domain = document.getElementById("domain").value;
    const list = document.getElementById("memberList");

    list.innerHTML = "";

    if (domain === "") {
        alert("Please select a domain");
        return;
    }

    members[domain].forEach(member => {
        const li = document.createElement("li");
        li.textContent = member;
        list.appendChild(li);
    });
}
