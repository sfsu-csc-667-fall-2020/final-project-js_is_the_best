const mongoose = require("mongoose")

const user = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
})

module.exports = {
  model: mongoose.model("user", user),
  schema: user
}