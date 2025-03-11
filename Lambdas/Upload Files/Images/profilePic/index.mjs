
import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import jwt from "jsonwebtoken"

const s3Client = new S3Client({ region: process.env.AWS_REGION });

handler = async(event) => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const expiresIn = 300;
    const fileName = `Profile/${ id||event.id }`;

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
