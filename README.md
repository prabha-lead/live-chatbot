# Serverless POC - Live Chatbot

<iframe width="640" height="360" src="https://www.loom.com/embed/7260b1c1fd48418fb179fd5464d612ad?sid=1757a271-6413-49ee-a4d2-a02572202a25" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## For AWS Configurations

```bash
aws configure
```

### Fill it

```bash
AWS Access Key ID [None]: AKIA4X5QXLTX4WT****
AWS Secret Access Key [None]: ********************************
Default region name [None]: eu-west-1
Default output format [None]: json
```

**_Node Version: v16.16.0 & Serverless Framework: v3.33.0_**

## Deployment

```bash
sls deploy
```

## For Single Function or Service Deployment (Won't work for configuration changes or without first deployment)

```
sls deploy -f <function-name>
```

## Withdraw Deployment

```
sls remove
```

## Steps to Do Before Deployment

### 1. Set Environment Variables for serverless.yaml

```yaml
environment:
  PROJECT_ID: "torp-xxxxx"
  SESSION_ID: "981dbc33-************"
  PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----****-----END PRIVATE KEY-----\n"
  CLIENT_EMAIL: "******.iam.gserviceaccount.com"
```

#### Steps to Get Environment Variables

## 1.Create a project in the google cloud console. <br>

Here's a step-by-step guide to create Project ID in Dialogflow:

### Project ID:

1. **Login to the Dialogflow Console**:

   - Go to the [Dialogflow Console](https://console.dialogflow.com/).
   - Sign in with your Google account.

2. **Select Your Agent**:
   - If you've multiple agents, make sure you're looking at the correct one. The agent's name is displayed in the left sidebar at the top.
3. **Get the Project ID**:
   - Click on the gear icon ⚙️ (settings) next to the agent's name.
   - Under the **General** tab, you will find the **Google Cloud** section. Here, the **Project ID** will be displayed.

## 2.Create an intent in the google dialog flow console and map it with your created project.<br>

## 3.Create a JSON for Google OAuth.<br>

To download the JSON key for a Google Cloud OAuth 2.0 client ID (which is often required for service-to-service communication and server-side authentication), you would typically generate a service account key. Here's how you can do it:

### Downloading the Service Account JSON Key:

1. **Google Cloud Console**:

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).

2. **Select Your Project**:

   - From the project dropdown at the top, select the project that is linked with your Dialogflow agent or the one for which you want to create the key.

3. **Navigation Menu**:

   - Click on the navigation menu (three horizontal lines) in the top left corner.

4. **IAM & Admin**:

   - From the navigation menu, go to "IAM & Admin" and then select "Service accounts".

5. **Create Service Account** (if you haven’t already):

   - Click on "+ CREATE SERVICE ACCOUNT" at the top.
   - Fill out the details for the service account.
   - Click "Create" and assign roles as necessary for your use-case.
   - Click "Continue" and then "Done".

6. **Download JSON Key**:
   - Locate the service account for which you want to download the key in the table of existing service accounts.
   - Click on the three dots (actions) on the right side of that service account row.
   - Click on "Manage keys".
   - In the "Keys" tab, click on "+ ADD KEY" and choose "JSON" from the dropdown.
   - The JSON key will be automatically downloaded to your computer.

Remember, this JSON key contains sensitive information that can be used to authenticate and perform actions on behalf of the service account in your GCP project. Treat it securely and avoid sharing it unnecessarily. Also, never commit it directly to source repositories. Instead, use secure methods like environment variables or secret management tools to handle such credentials in your projects.

## 4.Kindly enable Dialog flow API for the created project in the google console <br>

</b>

### 5. Add DynamoDB Full Access to the Role Created from Serverless Configuration in the Role Manager (IAM)
