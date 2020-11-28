const express = require("express");
const passport = require("../lib/passport/index");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Listing = require("../db/models/listing");
const morgan = require("morgan");

const redis = require("redis");
const redisClient = redis.createClient();

const KafkaProducer = require("../kafka/KafkaProducer");
const producer = new KafkaProducer("imageResize");
producer.connect(() => {
  console.log("kafka connected");
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./back_end/imageUploads",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const app = express();
const port = 3003;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

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

app.post("/listing/getListing", (req, res) => {
  Listing.findOne({
    _id: req.body.listingId
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
  "/listing/getUserListings",
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
  upload.single("imageFile"),
  (req, res) => {
    if (!req.file) {
      return res.send({
        success: false,
        message: "Image missing"
      });
    }

    const newListing = new Listing({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      posterId: req.user._id
    });

    newListing.save(async (err, listing) => {
      if (err) {
        return res.send({
          success: false
        });
      } else {
        try {
          await producer.send(req.file);
          await redisClient.publish("newListing", JSON.stringify(newListing));
        } catch (error) {
          console.log(error);
        }
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
