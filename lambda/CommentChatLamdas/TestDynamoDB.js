const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async function (event) {
  
  console.log(event)
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const newConnection = event.cid; // Get the connection ID from the event context
    const videoId = event.vid; // Get the video ID from query parameters
    console.log(`Here is your following connectionID and VideoId: ${newConnection} && ${videoId}`)

    // Update the DynamoDB table to add the connectionId
        const commandEdit = new UpdateCommand({
        TableName: process.env.TABLE_NAME,
        Key: { videoId: videoId },
        UpdateExpression: "SET connections = list_append(connections, :newConnection)",
        ExpressionAttributeValues: {
            ":newConnection": [newConnection], // Must be an array to append
        },
        ConditionExpression: "attribute_exists(videoId)", // Ensure the item exists
    });
        const commandAdd = new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            videoId: videoId,
            connections: [], // Start with an empty array
        },
    });




    try {
        // await docClient.send(commandAdd);
        await docClient.send(commandEdit);
    } catch (error) {
        console.error("Error updating DynamoDB:", error);
        return { statusCode: 500, body: JSON.stringify({ message: "Failed to add connection." }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Connection added successfully." }), event1: event };
};

