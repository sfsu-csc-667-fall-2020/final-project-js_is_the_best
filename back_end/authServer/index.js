const express = require("express");

const app = express();
const port = 3001;

app.post("/auth/register", (req, res) => {
  res.send("hello from /auth/register");
});

app.post("/auth/login", (req, res) => {
  res.send("hello from /auth/login");
});

app.post("/auth/logout", (req, res) => {
  res.send("hello from /auth/logout");
});

app.get("/auth/user", (req, res) => {
  res.send("hello from /auth/user");
});

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
