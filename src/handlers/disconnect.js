const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handle = async (event) => {
  const connectionId = event.requestContext.connectionId;

  const params = {
    TableName: "WebSocketConnections",
    Key: {
      connectionId: connectionId,
    },
  };

  try {
    await dynamoDB.delete(params).promise();
    return { statusCode: 200, body: "Disconnected." };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: "Failed to disconnect." };
  }
};
