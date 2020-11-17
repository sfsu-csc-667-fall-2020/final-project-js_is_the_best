const express = require("express");

const app = express();
const port = 3002;

app.post("/inquiry/sendMessage", (req, res) => {
  res.send("hello from /inquiry/sendMessage");
});

app.get("/inquiry/getUserInquiries", (req, res) => {
  res.send("hello from /inquiry/getUserInquiries");
});

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
