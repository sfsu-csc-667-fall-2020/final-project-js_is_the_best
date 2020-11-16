const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const port = 4000;
const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./build")));
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
