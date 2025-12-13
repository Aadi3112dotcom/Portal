const express = require("express")
const app = express()
app.use(express.json())
const users=[
    {username:"admin", password:"12345"},
    {username:"member", password:"12345"}
]
app.post("/login",(req,res)=>{
    const username = req.body.username;
  const password = req.body.password;

  const user = users.find(u =>
    u.username === username &&
    u.password === password
  );

  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
})
app.listen(5000,()=>{console.log("Server Started")}) 