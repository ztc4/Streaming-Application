const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async function (event) {
    try {
        console.log("Received event:", event);

        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);
        const connectionId = event.requestContext.connectionId;

        if (!connectionId) {
            throw new Error("No connectionId found");
        }

        const command = new QueryCommand({
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: "connectionID = :connectionId",
            ExpressionAttributeValues: {
                ":connectionId": connectionId
            }
        });

        const { Items } = await docClient.send(command);
        if (!Items || Items.length === 0) {
            throw new Error(`No item found for connectionId: ${connectionId}`);
        }

        const videoID = Items[0].videoID;
        const connectionID = Items[0].connectionID;

        console.log(`Found item with connectionID: ${connectionID}, videoID: ${videoID}`);
        console.log("Item data:", Items[0]);

        // Using DeleteCommand from lib-dynamodb
        const deleteCommand = new DeleteCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                connectionID: connectionID,
                videoID: videoID
            },
            ConditionExpression: "attribute_exists(connectionID) AND attribute_exists(videoID)"
        });

        console.log("Delete command:", deleteCommand);

        try {
            const deleteResponse = await docClient.send(deleteCommand);
            console.log("Item deleted successfully:", deleteResponse);
        } catch (e) {
            console.error("Error occurred while deleting item:", e);
            throw new Error(`Failed to delete item: ${e.message}`);
        }
    } catch (error) {
        console.error("Disconnection failed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to disconnect",
                error: error.message
            })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Disconnected Successfully!"
        }),
        event1: event
    };
};
