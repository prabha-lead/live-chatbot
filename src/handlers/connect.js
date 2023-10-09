const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handle = async (event) => {
  const connectionId = event.requestContext.connectionId;

  const params = {
    TableName: "WebSocketConnections",
    Item: {
      connectionId: connectionId,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    return { statusCode: 200, body: "Connected." };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: "Failed to connect." };
  }
};
