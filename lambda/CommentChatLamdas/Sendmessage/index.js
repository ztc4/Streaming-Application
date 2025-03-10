const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require("@aws-sdk/client-apigatewaymanagementapi");

exports.handler = async function (event) {
    console.log("Received event:", JSON.stringify(event));

    try {
        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);
        const connectionId = event.requestContext.connectionId;
        const callbackAPI = new ApiGatewayManagementApiClient({
            apiVersion: '2018-11-29',
            endpoint: 'https://' + event.requestContext.domainName + '/' + event.requestContext.stage,
        });
        const message = event.body
        // Retrieve the Video Id
        const command = new QueryCommand({
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: "connectionID = :connectionId",
            ExpressionAttributeValues: {
                ":connectionId": connectionId
            }
        })
        const response = await docClient.send(command);
        // Nothing was Found ->>
        if (response.Items.length === 0) {
            throw new Error("Failed!");
        }

        let videoId = response.Items[0].videoID;

        // Get the Connections!
        const commandGetAllConnections = new QueryCommand({
            TableName: process.env.TABLE_NAME,
            IndexName: "videoID-index", // Query the GSI
            KeyConditionExpression: "videoID = :videoId",
            ExpressionAttributeValues: {
                ":videoId": videoId
            }
        })
        const {Items} = await docClient.send(commandGetAllConnections);


        // const message = JSON.parse(event.body).message;

        const sendMessagesToConnections = Items.map(async({connectionID})=>{
            try{
                await callbackAPI.send(new PostToConnectionCommand(
                    {ConnectionId: connectionID, Data: JSON.stringify({message})}
                ))
            }
            catch(e){
                console.log(`Failed to send message to ${connection}:`, e);
            }
            console.log(connectionID)
        });
        try {
            await Promise.all(sendMessagesToConnections); // Wait for all to finish
        } catch (e) {
            console.error("Error sending messages:", e);
            return { statusCode: 500, body: JSON.stringify({ message: "Failed to send messages." }) };
        }



    } catch (error) {
        console.error("Error updating DynamoDB:", error);
        return { statusCode: 500, body: JSON.stringify({ message: "Messages weren't sent!" }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Messages sent Successfully!." }) };
};
