const mongoose = require("mongoose");

const message = new mongoose.Schema({
  body: { type: String }
});

const example = new mongoose.Schema({
  name: { type: String },
  messages: { type: [message] }
});

module.exports = {
  model: mongoose.model("example", example),
  schema: example
};
