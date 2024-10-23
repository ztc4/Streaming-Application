const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config(); // Remove for Lmambda

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export.handler = async(event) => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const expiresIn = 300;
    const fileName = `Videos/${event.id || "default_video"}`; // Change folder to 'videos'

    // Define the acceptable video MIME types
    const validMimeTypes = ['video/mp4', 'video/x-m4v', 'video/x-msvideo', 'video/x-ms-wmv', 'video/ogg', 'video/webm'];
    
    // Check if the contentType is valid
    const contentType = event.contentType; // Expecting contentType to be passed in the event
    if (!validMimeTypes.includes(contentType)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid content type. Only video files are allowed.' }),
        };
    }

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: contentType
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