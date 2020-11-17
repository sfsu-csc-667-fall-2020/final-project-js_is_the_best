const mongoose = require("mongoose")

const listing = new mongoose.Schema({
  imageUrl: String,
  title: {type: String, required: true},
  description: String,
  price: Number,
  datePosted: {type: Date, default: Date.now},
  posterId: Number
})

module.exports = {
  model: mongoose.model("listing", listing),
  schema: listing
}