require('dotenv').config();
const AWS = require('aws-sdk');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'AKIAITHSJQ3PJO5NYR3Q';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID || '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';
const bucketName = process.env.AWS_BUCKET_NAME || 'curadiv-test';

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});

const bucketParams = {
    Bucket: bucketName
};

// Create S3 service object
s3 = new AWS.S3();
// call S3 to retrieve policy for selected bucket
s3.getBucketPolicy(bucketParams, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else if (data) {
        console.log("Success", data.Policy);
    }
});