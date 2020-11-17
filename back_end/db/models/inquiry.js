const mongoose = require("mongoose")
const message = require("./message")

const inquiry = new mongoose.Schema({
  senderId: {type: Number, required: true},
  listingId: {type: Number, required: true},
  messages: {type: [message]}
})

module.exports = {
  model: mongoose.model("inquiry", inquiry),
  schema: inquiry
}