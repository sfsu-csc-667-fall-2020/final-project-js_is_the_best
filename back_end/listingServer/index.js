const express = require("express");
const passport = require("../lib/passport/index");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Listing = require("../db/models/listing");

const app = express();
const port = 3003;

app.use(cookieParser());
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Team5", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(info => {
    console.log("MongoDB connection successful");
    // console.log(info.models);
  })
  .catch(err => {
    console.log("MongoDB connection unsuccessful");
    // console.log(err);
  });

app.get("/listing/getListings", (req, res) => {
  Listing.find({})
    .then(listings => {
      return res.send({
        success: true,
        listings: listings
      });
    })
    .catch(error => {
      return res.send({
        success: false
      });
    });
});

app.get("/listing/getListing/:id", (req, res) => {
  Listing.findOne({
    _id: req.params.id
  })
    .then(listing => {
      return res.send({
        success: true,
        listing: listing
      });
    })
    .catch(error => {
      return res.send({
        success: false
      });
    });
});

app.post(
  "/listing/getUserListings/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Listing.find({
      posterId: req.user._id
    })
      .then(listings => {
        return res.send({
          success: true,
          listings: listings
        });
      })
      .catch(error => {
        return res.send({
          success: false
        });
      });
  }
);

app.post(
  "/listing/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //return res.send("hello from /listing/create");

    // the image would be stored in uploads
    // req.file
    // add a new khafka.publish with message: req.file

    const newListing = new Listing({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      posterId: req.user._id
    });

    newListing.save((err, listing) => {
      if (err) {
        return res.send({
          success: false
        });
      } else {
        return res.send({
          success: true,
          listing: listing
        });
      }
    });
  }
);

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
