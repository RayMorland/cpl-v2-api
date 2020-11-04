var aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
var DIR = './uploads';
var creds = require('../../credentials');

var s3 = new aws.S3(creds.awsS3);

const uploadFile = (req, res) => {

  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'cpl-file-storage-testing',
      key: function (req, file, cb) {
        cb(null, `${file.originalname}`);
      },
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.originalname });
      },
      acl: 'public-read'
    })
  }).single('file');

    return new Promise(function (resolve, reject) {
      upload(req, res, function (err) {
        if (err !== undefined) reject(err);
        resolve(req.file);
      });
    });
  }

module.exports = {
    uploadFile
}