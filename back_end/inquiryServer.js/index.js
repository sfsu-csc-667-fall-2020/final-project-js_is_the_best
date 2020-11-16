const express = require("express");

const app = express();
const port = 3002;

app.post("/inquiry/create", (req, res) => {
  res.send("hello from inquiry");
});

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
