const express = require("express");
const passport = require("../lib/passport/index");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const Listing = require('../db/models/listing');

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
  console.log('View All Listings');

  Listing.find({})
    .exec((err, listings) => {
      if(err) {
        res.send('getListings error');
      } else {
        console.log(listings);
        res.json(listings);
      }
    });
});

app.get("/listing/getListing/:id", (req, res) => {
  //res.send("hello from /listing/getListing");
  console.log("View one listings");

  Listing.findOne({
    _id: req.params.id
  })
    .exec((err, listings) => {
      if(err) {
        console.log('getUserListings error');
      } else {
        console.log(listings);
        res.json(listings);
      }
    });
});

app.get("/listing/getUserListings/:posterId", (req, res) => {
  //res.send("hello from /listing/getUserListings");
  console.log("View user listings");

  Listing.find({
    posterId: req.params.posterId
  })
    .exec((err, listings) => {
      if(err) {
        console.log('getUserListings error');
      } else {
        console.log(listings);
        res.json(listings);
      }
    });

});

app.post("/listing/create", (req, res) => {
  //res.send("hello from /listing/create");
  const newListing = new Listing();

  newListing = {
    imageUrl: req.body.imageUrl,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    datePosted: req.body.datePosted,
    posterId: req.body.posterId,
  };
  // newListing.imageUrl = req.body.imageUrl;
  // newListing.title = req.body.title;
  // newListing.description = req.body.description;
  // newListing.price = req.body.price;
  // newListing.datePosted = req.body.datePosted;
  // newListing.posterId = req.body.posterId;

  newListing.save((err, listing) => {
    if(err) {
      res.send('create error');
    } else {
      console.log(listing);
      res.send(listing);
    }
  });

  
});

app.post(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("reached the protected route " + req.user.name);
  }
);

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
