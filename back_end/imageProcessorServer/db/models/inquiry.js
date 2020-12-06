const mongoose = require("mongoose")
const message = require("./message").schema

const inquiry = new mongoose.Schema({
  senderId: {type: String, required: true},
  listingId: {type: String, required: true},
  messages: {type: [message]}
})

module.exports = {
  model: mongoose.model("inquiry", inquiry),
  schema: inquiry
}