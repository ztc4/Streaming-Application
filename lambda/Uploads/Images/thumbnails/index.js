const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config(); // Remove for Lmambda

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export.handler = async(event) => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const expiresIn = 300;
    const fileName = `Thumbnail/${event.id || "hello"}`;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: 'image/*'
    })
    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn }); // Use expiresIn from .env

        return {
            statusCode: 200,
            body: JSON.stringify({ uploadUrl: url }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to generate presigned URL', message: err.message }),
        };
    }

}

// const testEvent = { id: "1" };
// handler(testEvent)
//     .then(res => {
//         console.log('Response:', res); // Log the response
//     })
//     .catch(err => {
//         console.error('Error:', err); // Log any error that occurs
//     });