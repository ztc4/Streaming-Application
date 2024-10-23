const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require("@aws-sdk/client-apigatewaymanagementapi");

exports.handler = async function (event) {
  
    try {

        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);
        const connectionId = event.requestContext.connectionId;
        const videoId = event.queryStringParameters.vid; // Video ID
        // Used for Sending Message to Connections

        let allConnections;
        

        // Get the video where chat is happening
        const getConnections = new GetCommand({
            TableName: process.env.TABLE_NAME,
            Key: { videoId },
            ProjectionExpression: "connections", // Retrieve only connectionIds
        });
        
        // Attempt Getting the Connections
        try {
            const result = await docClient.send(getConnections);
            allConnections = result.Item?.connections || []; 
        } 
        catch (error) {
            console.error("Error retrieving connection IDs:", error);
            return { statusCode: 500, body: JSON.stringify({ message: "Failed to retrieve connections." }) };
        }

        //  Send Message to Every Connection
        const callbackAPI = new ApiGatewayManagementApiClient({
            apiVersion: '2018-11-29',
            endpoint: 'https://' + event.requestContext.domainName + '/' + event.requestContext.stage,
        });
        const message = JSON.parse(event.body).message;
        const sendMessagesToConnections = allConnections.map(async(connection)=>{
            if(connection != connectionId){
                try{
                    await callbackAPI.send(new PostToConnectionCommand( 
                        {ConnectionId: connection, Data: JSON.stringify({message})}
                    ))
                }
                catch(e){
                    console.log(`Failed to send message to ${connection}:`, e);
                }
            }
        });


        try {
            await Promise.all(sendMessagesToConnections); // Wait for all to finish
        } catch (e) {
            console.error("Error sending messages:", e);
            return { statusCode: 500, body: JSON.stringify({ message: "Failed to send messages." }) };
        }
        
    } 
    catch (error) {

        console.error("Error updating DynamoDB:", error);
        return { statusCode: 500, body: JSON.stringify({ message: "Messages weren't sent!" }) };

    }

    return { statusCode: 200, body: JSON.stringify({ message: "Messages sent Successfully!." })};
};