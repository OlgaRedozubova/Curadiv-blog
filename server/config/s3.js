require('dotenv').config();
const logger = require('heroku-logger');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuidv4 = require('uuid/v4');
const path = require('path');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'AKIAITHSJQ3PJO5NYR3Q';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID || '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';
const bucketName = process.env.AWS_BUCKET_NAME || 'curadiv-test';

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});

const s3 = new AWS.S3();

const readOnlyAnonUserPolicy = {
    Version: "2012-10-17",
    Statement: [
        {
            Sid: "AddPerm",
            Effect: "Allow",
            Principal: "*",
            Action: [
                "s3:GetObject"
            ],
            Resource: [
                ""
            ]
        }
    ]
};

// create selected bucket resource string for bucket policy
const bucketResource = "arn:aws:s3:::" + bucketName + "/*";
readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;

// convert policy JSON into string and assign into params
const bucketPolicyParams = {Bucket: bucketName, Policy: JSON.stringify(readOnlyAnonUserPolicy)};

// set the new policy on the selected bucket
s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
    if (err) {
        logger.Error('putBucketPolicy: Error', err.message, err.stack)
    } else {
        console.log("Success", data);
        logger.info(`putBucketPolicy: Success: data ${data}`)
    }
});

const storage = multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;