const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async function (event) {
  
  console.log(event)
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const connectionId = event.requestContext.connectionId;
    const videoId = event.queryStringParameters?.vid; // What Id does the video belong to?
    // const encryptedToken =  event.headers.authorization?.replace("Bearer ", "") || null // What is your token ?
    // let username; // Not decided, don't know what I used to encrypt?

    if (!videoId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "videoId must be provided for disconnection." }),
        };
      }

    try {
    // Update the connections array to remove the connectionId
        const removeConnection = new UpdateCommand({
        TableName: process.env.TABLE_NAME,
        Key: { videoId: videoId },
        UpdateExpression: "SET connections = list_remove(connections, :c)",
        ConditionExpression: "contains(connections, :c)", // Only remove if the connection exists
        ExpressionAttributeValues: {
            ":c": connectionId, // The connectionId to remove
        },
        });

        await docClient.send(removeConnection);
    } 
    catch (error) {
        console.error("Disconnection failed:", error);
        return {statusCode: 500, body: JSON.stringify({ message: "Failed to disconnect", error: error.message }),};
    }
    return { statusCode: 200, body: JSON.stringify({ message: "Disconnected Successfully!" }), event1: event };
};

