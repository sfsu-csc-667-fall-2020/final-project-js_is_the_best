const express = require("express");
const passport = require("../lib/passport/index");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const {connectMongoDb} = require('../db/connectDb')
const Inquiry = require('../db/models/inquiry').model
const Message = require('../db/models/message').model
const User = require('../db/models/user').model
const Listing = require('../db/models/listing')

const app = express();
const port = 3002;

app.use(cookieParser());
app.use(bodyParser.json());

connectMongoDb('Team5')

app.post("/inquiry/sendMessage",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // create new message
    const message = new Message()
    message.body = req.body.message
    message.senderId = req.user._id

    // first look if user has already sent an inquiry for the listing
    const preExistingInquiry = await Inquiry.findOne({senderId: req.user._id, listingId: req.body.listingId}).exec()

    console.log(preExistingInquiry)

    if (preExistingInquiry) {
      preExistingInquiry.messages.push(message)
      preExistingInquiry.save((err, inquiry)=> {
        if (err) {
          res.send({
            success: false,
            message: "error sending message."
          })
        }
        res.send({
          success: true,
          data: {
            inquiry: preExistingInquiry
          }
        })
        return
      })
    } else {
      // new inquiry needs to be made
      const newInquiry = new Inquiry()

      newInquiry.senderId = req.user._id
      newInquiry.listingId = req.body.listingId
      newInquiry.messages = [message]
  
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
    }
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
