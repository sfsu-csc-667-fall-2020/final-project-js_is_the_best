const mongoose = require('mongoose')

const connectMongoDb = (dbName) => {
  // mongoose connection
  mongoose
  .connect(`mongodb://localhost:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(info => {
    console.log("MongoDB connection successful");
  })
  .catch(err => {
    console.log("MongoDB connection unsuccessful");
  });
}

module.exports = {
  connectMongoDb
}