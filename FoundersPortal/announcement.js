document.addEventListener("DOMContentLoaded", () => {
  const postBtn = document.getElementById("postBtn");

  postBtn.addEventListener("click", async () => {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const link = document.getElementById("link").value.trim();
    const targetRole = document.getElementById("targetRole").value;

    //  Basic validation
    if (!title || !description) {
      alert("Title and Description are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/announcements", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title,
    description,
    type,
    date,
    time,
    link,
    targetRole,
    targetDomain: "all", 
    createdBy: "founder" 
  })
});


      if (!res.ok) {
        throw new Error("Failed to post announcement");
      }

      alert("Announcement posted successfully!");

      // Clear form
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("type").value = "general";
      document.getElementById("date").value = "";
      document.getElementById("time").value = "";
      document.getElementById("link").value = "";
      document.getElementById("targetRole").value = "all";

    } catch (err) {
      console.error(err);
      alert("Server error. Is backend running?");
    }
  });
});
