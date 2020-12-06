const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  image500Url: String, // to store 500x500 img url
  image100Url: String,// to store 100x100 img url
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