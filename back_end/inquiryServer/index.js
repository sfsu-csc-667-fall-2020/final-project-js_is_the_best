const express = require("express");
const passport = require("./lib/passport/index");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { connectMongoDb } = require("./db/connectDb");
const Inquiry = require("./db/models/inquiry").model;
const Message = require("./db/models/message").model;
const Listing = require("./db/models/listing");
const redis = require("redis");
const redisClient = redis.createClient({host: 'redis'});
// const redisClient = redis.createClient();
const morgan = require("morgan");

const app = express();
const port = 5002;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));

connectMongoDb("Team5");

app.post(
  "/inquiry/sendMessage",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // create new message
    const message = new Message();
    message.body = req.body.message;
    message.senderId = req.user._id;

    // first look if user has already sent an inquiry for the listing
    let preExistingInquiry;
    try {
      preExistingInquiry = await Inquiry.findOne({
        senderId: req.user._id,
        listingId: req.body.listingId
      }).exec();
    } catch (error) {
      return res.send({
        success: false,
        message: "error sending message."
      });
    }

    if (preExistingInquiry) {
      preExistingInquiry.messages.push(message);
      preExistingInquiry.save(async (err, inquiry) => {
        if (err) {
          return res.send({
            success: false,
            message: "error sending message."
          });
        }

        await redisClient.publish(
          "newInquiryMessage",
          JSON.stringify(preExistingInquiry)
        );
        return res.send({
          success: true,
          data: {
            inquiry: preExistingInquiry
          }
        });
        return;
      });
    } else {
      // new inquiry needs to be made
      const newInquiry = new Inquiry();

      newInquiry.senderId = req.user._id;
      newInquiry.listingId = req.body.listingId;
      newInquiry.messages = [message];

      newInquiry.save(async (err, inquiry) => {
        if (err) {
          return res.send({
            success: false,
            message: "error sending inquiry."
          });
        }

        await redisClient.publish(
          "newInquiryMessage",
          JSON.stringify(newInquiry)
        );
        return res.send({
          success: true,
          data: {
            inquiry: newInquiry
          }
        });
      });
    }
  }
);

app.post(
  "/inquiry/admSendMessage",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let admInquiry = await Inquiry.findOne({
        _id: req.body.inquiryId
      }).exec();

      if (admInquiry) {
        admInquiry.messages.push({
          senderId: req.user._id,
          body: req.body.message
        });
        admInquiry.save(async (err, inquiry) => {
          if (err) {
            console.log("reach here");
            return res.send({ success: false });
          }
          await redisClient.publish(
            "newInquiryMessage",
            JSON.stringify(admInquiry)
          );
          return res.send({
            success: true,
            data: {
              inquiry: admInquiry
            }
          });
        });
      } else {
        return res.send({ success: false });
      }
    } catch (error) {
      return res.send({
        success: false,
        message: "error sending message."
      });
    }
  }
);

app.get(
  "/inquiry/getUserInquiries",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let inquiries = [];
    const listings = await Listing.find({ posterId: req.user._id });
    listings.forEach(async listing => {
      const inquiryArray = await Inquiry.find({ listingId: listing._id });
      inquiries.push(...inquiryArray);
    });
    return res.send({
      success: true,
      data: {
        inquiries
      }
    });
  }
);

app.post(
  "/inquiry/getAdmInquiries",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const inquiries = await Inquiry.find({ listingId: req.body.listingId });
      return res.send({
        success: true,
        inquiries
      });
    } catch (err) {
      return res.send({ success: false });
    }
  }
);

app.post(
  "/inquiry/getUserInquiry",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const inquiry = await Inquiry.findOne({
        listingId: req.body.listingId,
        senderId: req.user._id
      });
      return res.send({
        success: true,
        inquiry
      });
    } catch (err) {
      return res.send({ success: false });
    }
  }
);

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
