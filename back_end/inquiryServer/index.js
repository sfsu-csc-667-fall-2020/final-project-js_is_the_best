const express = require("express");
const passport = require("../lib/passport/index");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3002;

app.use(cookieParser());

app.post("/inquiry/sendMessage", (req, res) => {
  res.send("hello from /inquiry/sendMessage");
});

app.get("/inquiry/getUserInquiries", (req, res) => {
  res.send("hello from /inquiry/getUserInquiries");
});

app.post(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("reached the protected route " + req.user.name);
  }
);
app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
