require('dotenv').config();
const AWS = require('aws-sdk');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'AKIAITHSJQ3PJO5NYR3Q';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID || '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';
const bucketName = process.env.AWS_BUCKET_NAME || 'curadiv-test';

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});

// Create S3 service object
s3 = new AWS.S3();

// call S3 to retrieve upload file to specified bucket
const uploadParams = {Bucket: bucketName, Key: '', Body: ''};
const file = __dirname + '/../uploads/02.png';

const fs = require('fs');
const fileStream = fs.createReadStream(file);

fileStream.on('error', function(err) {
    console.log('File Error', err);
});

// console.log('fileStream => ', fileStream);

uploadParams.Body = fileStream;
// console.log('uploadParams.Body => ', uploadParams.Body);

const path = require('path');
uploadParams.Key = path.basename(file);
// console.log('uploadParams.Key => ', uploadParams.Key);


// // call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } if (data) {
        console.log("Upload Success", data.Location);
    }
});