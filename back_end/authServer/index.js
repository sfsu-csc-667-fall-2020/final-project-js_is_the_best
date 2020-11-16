const express = require("express");

const app = express();
const port = 3001;

app.post("/auth/register", (req, res) => {
  res.send("hello from auth");
});

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
