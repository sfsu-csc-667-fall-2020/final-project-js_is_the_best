const aws = require("aws-sdk");
const s3 = new aws.S3({ apiVersion: "2006-03-01" });
const fs = require("fs");

const getFileData = filePath => {
  return new Promise(async (resolve, reject) => {
    fs.readFile(filePath, async function(error, filedata) {
      if (error) {
        reject(error.toString());
      } else {
        resolve(filedata);
      }
    });
  });
};

const clearFile = filePath => {
  return new Promise(async (resolve, reject) => {
    fs.unlink(filePath, error => {
      if (error) {
        reject(filePath);
      } else {
        resolve();
      }
    });
  });
};

const getS3files = (bucketName = "csc667-final", directoryPath = "img/") => {
  return new Promise(async (resolve, reject) => {
    let s3Contents = null;
    try {
      s3Contents = await s3
        .listObjectsV2({
          Bucket: bucketName,
          Prefix: directoryPath
        })
        .promise();
      resolve(s3Contents.Contents);
    } catch (error) {
      reject(error.toString());
    }
  });
};

const addS3file = (
  bucketName = "csc667-final",
  filePath = "img/",
  filedata
) => {
  return new Promise(async (resolve, reject) => {
    try {
      data = await s3
        .putObject({
          Bucket: bucketName,
          Key: filePath,
          Body: filedata,
          ACL: "public-read"
        })
        .promise();
      resolve(data);
    } catch (error) {
      reject(error.toString());
    }
  });
};

module.exports = { addS3file, getS3files, getFileData, clearFile };
