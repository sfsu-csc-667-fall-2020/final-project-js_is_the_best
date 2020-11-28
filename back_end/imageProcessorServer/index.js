var sharp = require("sharp");
const fs = require("fs");
const listing = require("../db/models/listing");

const aws = require("aws-sdk");
aws.config.loadFromPath("./lib/aws/config.json");
aws.config.update({ region: "us-west-1" });
const awsS3 = require("../lib/aws/index");

const redis = require("redis");
const redisClient = redis.createClient();

const KafkaConsumer = require("../kafka/KafkaConsumer");
const consumer = new KafkaConsumer(["imageResize"]);

consumer.on("message", async message => {
  switch (message.topic) {
    case "imageResize":
      console.log("imageResize event triggered");
      try {
        let data = JSON.parse(message.value);
        let file = data.file;
        let listingId = data.listingId;

        // creating temp files for storing resized images
        fs.openSync("./processedImages/100resize.jpg", "w");
        fs.openSync("./processedImages/500resize.jpg", "w");

        //storing resized images
        let new100FileInfo = await sharp("./imageUploads/" + file.filename)
          .resize({ height: 100, width: 100 })
          .toFile("./processedImages/100resize.jpg");
        let new500FileInfo = await sharp("./imageUploads/" + file.filename)
          .resize({ height: 500, width: 500 })
          .toFile("./processedImages/500resize.jpg");

        //get current contents in our s3 bucket
        let contents = await awsS3.getS3files("csc667-final", "img/");
        // console.log(contents); // to see what are the current contents of S3 bucket

        //store first file on bucket
        let fileName = "img/" + (contents.length + 1) + "_100resize" + ".jpg";
        let fileData = await awsS3.getFileData(
          "./processedImages/100resize.jpg"
        );
        await awsS3.addS3file("csc667-final", fileName, fileData);
        const imgUrl1 =
          "https://csc648-string.s3-us-west-1.amazonaws.com/" + fileName;

        //store second file on bucket
        fileName = "img/" + (contents.length + 1) + "_500resize" + ".jpg";
        fileData = await awsS3.getFileData("./processedImages/500resize.jpg");
        await awsS3.addS3file("csc667-final", fileName, fileData);
        const imgUrl2 =
          "https://csc648-string.s3-us-west-1.amazonaws.com/" + fileName;

        listing
          .findOne({ _id: listingId })
          .then(listin => {
            console.log("came here");
            console.log(listin);
            listin.image100Url = imgUrl1;
            listin.image500Url = imgUrl2;
            listin.save();
          })
          .catch(err => {
            console.log(err);
          });
        // TODO: problem, it is not actually updating the actual listing object

        await fs.unlinkSync("./imageUploads/" + file.filename); //TODO
        await fs.unlinkSync("./processedImages/100resize.jpg");
        await fs.unlinkSync("./processedImages/500resize.jpg");

        console.log("done upload");

        await redisClient.publish("ImageProcessDone", listingId);

        // TODO: send redis publish
      } catch (err) {
        console.log(err);
        break;
      }

      break;
    default:
      break;
  }
});

consumer.connect();
