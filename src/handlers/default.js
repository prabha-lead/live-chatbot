const AWS = require("aws-sdk");
const { SessionsClient } = require("@google-cloud/dialogflow");

const client = new SessionsClient();

exports.handle = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const userInput = JSON.parse(event.body).message;

  const sessionPath = client.projectAgentSessionPath(
    "YOUR_PROJECT_ID",
    "YOUR_SESSION_ID"
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userInput,
        languageCode: "en-US",
      },
    },
  };

  const apiGateway = new AWS.ApiGatewayManagementApi({
    endpoint: `${event.requestContext.domainName}/${event.requestContext.stage}`,
  });

  try {
    const responses = await client.detectIntent(request);
    const result = responses[0].queryResult.fulfillmentText;

    await apiGateway
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify({ message: result }),
      })
      .promise();

    return { statusCode: 200, body: "Message processed." };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: "Failed to process message." };
  }
};
