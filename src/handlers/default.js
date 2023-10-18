const AWS = require("aws-sdk");
const { SessionsClient } = require("@google-cloud/dialogflow");

const config = {
  credentials: {
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
  },
};
const client = new SessionsClient(config);

exports.handle = async (event) => {
  try {
    const connectionId = event.requestContext.connectionId;
    const userInput = JSON.parse(event.body).message;

    const sessionPath = client.projectAgentSessionPath(
      process.env.PROJECT_ID,
      process.env.SESSION_ID
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
