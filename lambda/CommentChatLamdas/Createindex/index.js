const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

// This function is used to initialize a index/chat for wehn videos are uploaded 

exports.handler = async function (event) {

    try {
       
        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);
        const videoId = event.queryStringParameters.vid; 
        if(!videoId){
            throw new Error("You must add an query parameter for the Video Id... vid=??")
        }
    
        const addIndexForVideo = new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: {
                videoId: videoId,
                connections: [], // Start with an empty array
            },
        });
        await docClient.send(addIndexForVideo);
    } 
    catch (error) {
        console.error("Error updating DynamoDB:", error);
        return { statusCode: 500, body: JSON.stringify({ message: "Had trouble adding to database!", error: error }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Connection added successfully." }) };
};