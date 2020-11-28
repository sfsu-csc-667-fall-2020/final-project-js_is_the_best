var sharp = require("sharp");
const fs = require("fs");
const KafkaConsumer = require("../kafka/KafkaConsumer");
const consumer = new KafkaConsumer(["imageResize"]);

consumer.on("message", async message => {
  switch (message.topic) {
    case "imageResize":
      let file;
      try {
        file = JSON.parse(message.value);
        let fileExtension = "." + file.filename.split(".").pop();

        // fs.readFile("./imageUploads/1015478_1.jpg", async function(
        //   error,
        //   filedata
        // ) {
        //   console.log("error", error);
        //   console.log("filedata", filedata);
        // });

        // const contents = fs.readFileSync(
        //   "back_end/imageProcessorServer/1015478_1.jpg",
        //   {
        //     encoding: "base64"
        //   }
        // );
        fs.openSync("./processedImages/100resize.jpg", "w");

        let newFileInfo = await sharp("./imageUploads/1015478_1.jpg")
          .resize({ height: 100, width: 100 })
          .toFile("./processedImages/100resize.jpg");
        console.log(newFileInfo);

        // clipper(file.path, function() {
        //   this.resize(100, 100).toFile(
        //     // "./processedImages/100resize" + fileExtension
        //     "./processedImages/100resize",
        //     () => console.log("done")
        //   );
        // });
        // clipper(file.path, function() {
        //   this.resize(500, 500).toFile(
        //     "./processedImages/500resize" + fileExtension
        //   );
        // });
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
