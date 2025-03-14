import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import jwt from "jsonwebtoken"

const s3Client = new S3Client({ region: process.env.REGION });

export const handler = async (event) => {

  // Extract token from the Authorization header ("Bearer <token>")
  const token = event.headers?.authorization?.split(' ')[1];
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized: No token provided.' }),
    };
  }

  // Verify token and extract details
  const secretKey = Buffer.from(process.env.JWTSECRET, 'base64');
  let id, username, contentType;
  try {
    const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
    id = decoded.id;
    username = decoded.username;
    contentType = event.body.contentType || JSON.parse(event.body).contentType
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Bad request!', error: error.message }),
    };
  }

   // Change folder to 'Videos'

    
   const validTypes = [
    'video/mp4',
    'video/x-m4v',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'video/ogg',
    'video/webm'
  ];

  if (!validTypes.includes(contentType)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid content type. Only video files are allowed.' }),
    };
  }

  // Build the S3 key using the video [id] and file extension
  const bucketName = process.env.BUCKET_NAME;
  const expiresIn = 300;
  const extension = contentType.split('/')[1];
  const fileName = `Videos/${id}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: contentType,
  });

  // Generate and return the presigned URL
  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    console.log(url)
    return {
      statusCode: 200,
      body: JSON.stringify({ video: url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate presigned URL', message: err.message }),
    };
  }
};




