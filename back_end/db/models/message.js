const mongoose = require("mongoose")

const message = new mongoose.Schema({
  senderId: {type: Number, required: true},
  body: String
})

module.exports = {
  model: mongoose.model("message", message),
  schema: message
}