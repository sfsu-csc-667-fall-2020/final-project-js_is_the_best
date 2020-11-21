const express = require("express");
const passport = require("../lib/passport/index");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const {connectMongoDb} = require('../db/connectDb')
const Inquiry = require('../db/models/inquiry').model
const User = require('../db/models/user').model
const Listing = require('../db/models/listing')

const app = express();
const port = 3002;

app.use(cookieParser());
app.use(bodyParser.json());

connectMongoDb('Team5')

app.post("/inquiry/sendMessage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newInquiry = new Inquiry()

    newInquiry = {
      senderId: req.user._id,
      listingId: req.body.listingId,
      message: req.body.message
    }

    newInquiry.save((err, inquiry) => {
      if (err) {
        res.send({
          success: false,
          message: "error sending inquiry."
        })
      }
      res.send({
        success: true,
        data: {
          inquiry: newInquiry
        }
      })
    })


});

app.get("/inquiry/getUserInquiries",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let inquiries = []
    const listings = await Listing.find({posterId: req.user._id})
    listings.forEach(async (listing)=> {
      const inquiryArray = await Inquiry.find({listingId: listing._id})
      inquiries.push(...inquiryArray)
    })
    res.send({
      success: true,
      data: {
        inquiries
      }
    })
});

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
