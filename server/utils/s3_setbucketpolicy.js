require('dotenv').config();
const AWS = require('aws-sdk');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'AKIAITHSJQ3PJO5NYR3Q';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID || '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';
const bucketName = process.env.AWS_BUCKET_NAME || 'curadiv-test';

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});

// const bucketParams = {
//     Bucket: bucketName
// };

// Create S3 service object
s3 = new AWS.S3();
// call S3 to retrieve policy for selected bucket

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
        // display error message
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});