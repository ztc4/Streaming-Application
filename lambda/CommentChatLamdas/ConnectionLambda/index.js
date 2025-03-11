const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async (event) => {

  try{

    const docClient = DynamoDBDocumentClient.from(new DynamoDBClient());
    const connectionId = event.requestContext.connectionId; // Which connection are you?
    const videoId = Number(event.queryStringParameters.vid)  // What Id does the video belong to?
    console.log(`Here is your connection id , ${connectionId} and video id ${videoId}`);

    const AddConnection = new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item:{
        connectionID : connectionId,
        videoID: videoId
      }

    });
    // Sent to Database
    await docClient.send(AddConnection);

  }
  catch(e){
    console.error(e)
    return {
      statusCode: 400,
      body:"Failed to create an connection",
      error: e
    };
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Successfully Connected!'),

  };
  console.log("Successfully connected!")
  return response;
};
