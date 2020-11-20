const express = require("express");
const passport = require("../lib/passport/index");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3003;

app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Team5", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(info => {
    console.log("MongoDB connection successful");
    // console.log(info.models);
  })
  .catch(err => {
    console.log("MongoDB connection unsuccessful");
    // console.log(err);
  });

app.get("/listing/getListings", (req, res) => {
  res.send("hello from /listing/getListings");
});

app.get("/listing/getListing", (req, res) => {
  res.send("hello from /listing/getListing");
});

app.get("/listing/getUserListings", (req, res) => {
  res.send("hello from /listing/getUserListings");
});

app.post("/listing/create", (req, res) => {
  res.send("hello from /listing/create");
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
