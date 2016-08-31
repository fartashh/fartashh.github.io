+++
categories = ["AWS", "Lambda", "SNS"]
date = "2016-08-31T10:11:33+08:00"
draft = false
tags = ["AWS", "Lambda"]
title = "Architecting Serverless Push Notification System in AWS"
image = "http://fartashh.github.io/images/post/lambda-sns/aws_sns_lambda.png"
desc = "Server less push notification system by using AWS Lambda and SNS. It is scalable, flexible and integrable with any user management system. It is designed to send user based push notification."

+++


{{< img src="/images/post/lambda_sns/aws_sns_lambda.png" title="" class="align-center">}}
One of the best approaches to increase and keep customer engagement with your app is push notification and as you may know 
there are many services such SNS, Firebase, Pushwoosh, Urban Airship, carnival and etc., to address this need.

Recently at Mindvalley we have decided to use one of the available solutions to send push notifications to our web and mobile users.
The new service should support following requirements;

 * Integrable with our user management system
 * Authentication and Authorization with Auth0
 * Send notification to **user** (multiple devices, multiple platform) not only single device
 * Schedule notification
 * Flexible user segmentation
 * Comprehensive API to manage notification system 
<!--more-->

## Proposed Solution 

After doing some research and comparing aforementioned solutions I came up with the idea of using server less approach.
The proposed system used AWS SNS, RDS, Lambda, and API Gateway to fulfill all requirements.
 
{{< img src="/images/post/lambda_sns/sns_architecture.png" title="" class="align-center">}}


you can find all lambdas of the system [here](https://github.com/fartashh/userbase-sns-lambda)
lets look at each step of implementing the solution;

### Step 1: Design Database

I have decided to use RDS (postgresql) to store the system data. System's DB contains 4 tables;

 * **users_endpoints**
 
     *internal_user_id* : connects the system with user management system.
     
     *arn* : Amazon Resource Name you get this value after registering the device in SNS.
     
     *token* : user device token.
     
     *app_name* : application name.
     
     *user_data* : it is a dictionary, you can store any data for user and query them later based on given attributes.
     
     *timezone* : to send notification in user timezone.
      
 
 * **topics**
 
    stores topics which user may want to subscribe to them.
 
 * **subscriptions**
 
    stores user's subscription information
 
 * **notification**
 
    stores scheduled notifications
 
 
{{< img src="/images/post/lambda_sns/aws_sns_lambda_erd.png" title="" class="align-center">}}

### Step 2: Implement Lambdas

Before you start uploading and deploying lambdas I suggest to
read [*Configure your Lambda functions like a champ and let your code sail smoothly to Production*](https://getpocket.com/a/read/1215426880)
post. It explains how setup your lambdas properly in *test*, *stg*, and *production* environments.  

#### Step 2.1: Lambdas Configuration
We can store our configuration in AWS S3 ,dynamo db or in deployment package. configuration contains information 
about list of applications setup on SNS and RDS configuration for each environment.

{{< highlight python >}}
{
  "$LATEST": {
    "APPLICATIONS": {
      "appname-ios-dev": "arn:aws:sns:us-east-1:xxxxxxxxxx:app/APNS_SANDBOX/ios-dev"
    },
    "DATABASE": {
      "host": "dev-sns-lambda.xxxxxxxxxx.us-east-1.rds.amazonaws.com",
      "port": 5432,
      "db": "xxxxxxxxxx",
      "tables": {
        "users_endpoints": "users_endpoints",
        "topics": "topics",
        "subscriptions":"subscriptions",
        "notifications":"notifications"
      },
      "user": "xxxxxxxxxx",
      "password": "xxxxxxxxxxxxxxxxxx"
    }
  },
  "DEV": {
  },
  "TEST": {
  },
  "PROD": {
  }
}
{{< /highlight >}}

#### Step 2.2: Lambdas
As mentioned earlier, we need to implement 9 lambdas for user, device, subscription, and notification management. you can add
or update any of given function to support your requirements.
[you can download all lambdas from here](https://github.com/fartashh/userbase-sns-lambda).
 
### Step 3: API Gateway 
After deploying and testing all lambdas now it is time to add API gateway as a trigger. 
After creating the API in [API Gateway](https://aws.amazon.com/api-gateway/) console, we need to add four resources and for
each resource we need to add corespondent method;

{{< img src="/images/post/lambda_sns/api_gateway.png" title="" class="align-center">}}

### Step 4: Send Scheduled notification
You may figure it out by now that there is one lambda `handel_notification_cron` which is not connected to any end point.
For this lambda we need to add `CloudWatch Events - Schedule` trigger. This trigger enable us to have a cron job and call lambdas every few 
minutes to send scheduled notifications.

### Step 5: Security 
There are three techniques to secure your APIs. The simplest way is using *api-key* you can simply add new api-key in API Gateway 
console and enforce APIs to use it. The second method is adding *Authorizers*, it allows developers to authorize their APIs
using bearer token authorization strategies, such as OAuth using an AWS Lambda function. And third method is using AWS_IAM role
which is explained in detail on [this tutorial](https://auth0.com/docs/integrations/aws-api-gateway).

## conclusion
AWS Lambdas makes you able to build and run applications on the AWS cloud quickly and easily. On the other hand, existence of
many great services in different domains help developers to solve complex problems in short amount of time. 
  
