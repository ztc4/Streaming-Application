import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import jwt from "jsonwebtoken"

const s3Client = new S3Client({ region: process.env.REGION });

export const handler = async (event) => {
    // JWT
    const token = event.headers.authorization?.split(' ')[1] ;
    const secretKey = Buffer.from(process.env.JWTSECRET, 'base64');
    let id,username,contentType;
 
    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Unauthorized: No token provided.' }),
        };
    }
    
    try{
        const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] })
        id = decoded.id;
        username = decoded.username;
        contentType = event.body.contentType || JSON.parse(event.body).contentType

    }catch(error){   
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Bad request!' })
        }
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const bucketName = process.env.BUCKET_NAME;
    const expiresIn = 300;
    const extension = contentType.split('/')[1]; // Example would be png
    const fileName = `Thumbnail/${id}.${extension}\``; // Change folder to 'Videos'

    


    if (!validTypes.includes(contentType)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid content type. Only images files are allowed.' }),
        };
    }
    // console.log("We are now making the putObject")
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: contentType
    });

    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn });
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
};





