const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  imageUrl: String,
  title: {type: String, required: true},
  description: String,
  price: Number,
  datePosted: {type: Date, default: Date.now},
  posterId: String
})

// module.exports = {
//   model: mongoose.model('listing', listing),
//   schema: listing
// }
module.exports = mongoose.model('Listing', ListingSchema);