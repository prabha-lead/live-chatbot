# Serverless POC

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
  SOURCE_EMAIL: "name@domain.com"
  SQS_QUEUE_URL: "https://sqs.<region>.amazonaws.com/<accountId>/<queue-name>"
  BUCKET_NAME: "test-serverless-xxxx"
  COGNITO_USER_POOL_ID: "eu-west-1_xxxxxxx"
  COGNITO_CLIENT_ID: "3v6ii92cdr2jxxxxxx"
```

#### Steps to Get Environment Variables

#####

<b>
1.Verify source email address in SES "Verify Identifier". <br>
2.Create a Queue in SQS in AWS, then copy URL and ARN to replace in the serverless.yaml file.<br>
3.Create a Bucket in S3.<br>
4.Create a User Pool in AWS Cognito and collect Pool ID and Client ID from the App Integration section.<br>
</b>

### 2. Replacing ARN for sendEmail Lambda Function in serverless.yaml

```yaml
sendEmail:
  handler: src/handlers/sendEmail.sendEmail
  events:
    - sqs:
        arn: <Paste SQS ARN>
```

### 3. Verify Source Email Address in the SES Configuration

### 4. Add DynamoDB Full Access, SES Full Access, S3 Full Access, Cognito Power User Full Access and SQS Full Access to the Role Created from Serverless Configuration in the Role Manager (IAM)
