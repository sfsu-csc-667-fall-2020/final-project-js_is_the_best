const express = require("express");

const app = express();
const port = 3003;

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

app.post("/listing/create", (req, res) => {
  res.send("hello from listing");
});

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
