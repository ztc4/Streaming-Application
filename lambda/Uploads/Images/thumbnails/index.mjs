import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import jwt from "jsonwebtoken"

const s3Client = new S3Client({ region: process.env.REGION });

export const handler = async (event) => {
    // JWT
    const token = event.headers.authorization?.split(' ')[1] ;
    const BASE64_SECRET = process.env.JWTSECRET;
    const secretKey = Buffer.from(BASE64_SECRET, 'base64');
    let id; // video di
    let contentType; // content type
    let username;
 
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
        contentType = decoded.contentType;

    }catch(error){   
        return {statusCode: 401,  body: JSON.stringify({ message: 'Bad request!' })}
    }

    const bucketName = process.env.BUCKET_NAME;
    const expiresIn = 300;
    const fileName = `Thumbnail/${id || event.id }`; // Change folder to 'Videos'

    
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

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
        const url = await getSignedUrl(s3Client, command, { expiresIn }); // Use expiresIn from .env
        // console.log(url)
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





