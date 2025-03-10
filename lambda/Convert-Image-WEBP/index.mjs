import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import Sharp from 'sharp';


const s3Client = new S3Client({ region: process.env.REGION });

export const handler = async (event) => {
  console.log(event)
    const bucketName = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    const targetBucket = process.env.TARGETBUCKET;
    console.log(`This is the key - ${key} & this is the bucket name - ${bucketName}`)
    // Get the image from the source S3 bucket
    const { Body } = await s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: key }));
    

    const image = await Body.transformToByteArray();
    console.log(image)

    // Convert the image to .webp format using Sharp
    const webpImage = await Sharp(image).webp().toBuffer();
    console.log("Succussfelly converted the image")
   

    // Upload the converted image to the target S3 bucket
    await s3Client.send(new PutObjectCommand({
        Bucket: targetBucket,
        Key: key.replace(/\.[^/.]+$/, ".webp"),
        Body: webpImage,
        ContentType: "image/webp"
    }));

    return `Image ${key} converted and saved to ${targetBucket}`;
};








