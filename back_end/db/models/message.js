const mongoose = require("mongoose")

const message = new mongoose.Schema({
  senderId: {type: String, required: true},
  body: String
})

module.exports = {
  model: mongoose.model("message", message),
  schema: message
}