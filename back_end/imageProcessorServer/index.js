var sharp = require("sharp");
const fs = require("fs");

const aws = require("aws-sdk");
aws.config.loadFromPath("../lib/aws/config.json");
aws.config.update({ region: "us-west-1" });

const awsS3 = require("../lib/aws/index");

const KafkaConsumer = require("../kafka/KafkaConsumer");
const consumer = new KafkaConsumer(["imageResize"]);

consumer.on("message", async message => {
  switch (message.topic) {
    case "imageResize":
      let file;
      try {
        file = JSON.parse(message.value);

        // creating temp files for storing resized images
        fs.openSync("./processedImages/100resize.jpg", "w");
        fs.openSync("./processedImages/500resize.jpg", "w");

        //storing resized images
        let new100FileInfo = await sharp("./imageUploads/1015478_1.jpg")
          .resize({ height: 100, width: 100 })
          .toFile("./processedImages/100resize.jpg");
        let new500FileInfo = await sharp("./imageUploads/1015478_1.jpg")
          .resize({ height: 500, width: 500 })
          .toFile("./processedImages/500resize.jpg");

        //get current contents in our s3 bucket
        let contents = await awsS3.getS3files("csc648-string", "img/");

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
