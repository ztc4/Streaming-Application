const { DynamoDBClient, UpdateCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

export const handler = async (event) => {
  
  try{

    const docClient = DynamoDBDocumentClient.from(new DynamoDBClient());
    const connectionId = event.requestContext.connectionId; // Which connection are you?
    const videoId = event.queryStringParameters.vid; // What Id does the video belong to?
    // const encryptedToken =  event.headers.authorization?.replace("Bearer ", "") || null // What is your token ?
    // let username;
    
    // Check If Token exist
    // if(!encryptedToken){
    //     return {
    //       statusCode: 400,
    //       body: JSON.stringify({ message: "You must be logged in to Chat!" }) 
    //     }
    // }
    // Get Username from Token
    // let decryptedtoken = jwt.verify(encryptedToken, process.env.JWT_SECRET || "SecretCode")
    // username = decryptedtoken.username 

    // Create Command
    const AddConnection = new UpdateCommand({
      TableName: process.env.TABLE_NAME,
      Key: { videoId: videoId },
      UpdateExpression: "SET connections = list_append(connections, :newConnection)",
      ExpressionAttributeValues: {
          ":newConnection": [connectionId], // Must be an array to append
      },
      ConditionExpression: "attribute_exists(videoId)", // Ensure the item exists
    });
    // Sent to Database
    docClient.send(AddConnection)
    
  }
  catch(e){
		return {
		  statusCode: 400,
		  body:"Failed to create an connection",
      error: e
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Successfully Connected!'),
    event: event,
    username: username
  };
  return response;
};
