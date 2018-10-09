# MyParcel.com voice assistant 

## Introduction

  The purpose of this project is to use an Alexa Echo device as a voice assistant for label printing in order to simplify every day work for small webshop owners and warehouse employees. It should also be an extra security layer for employers as it does not expose other parts of software such as the financial information to short-term employees. 

  By a simple voice command Alexa should retrieve all details neccessary for label printing from a list of today's orders and send it to a local printer, which then starts the printing process. 

## Table of Contents

- [Raspberry Pi](#raspberry-pi)
  - [Web Server](#web-server)
  - [Print Server](#print-server)
  - [Tunnel](#tunnel)

- [ Alexa Skill](#alexa-skill)
    - [ Intents and Utterances](#intents-and-utterances)
    - [ AWS Lambda](#aws-lambda)


## Raspberry Pie

### Web Server

### Print server

### Tunnel

## Alexa Skill

  In order to create a custom skill for Alexa it is neccesary to have an Amazon Developer account at https://developer.amazon.com/alexa

  There you can select Alexa Skills Kit and choose to start a new skill.
  Once a new skill is created it requires an invocation name - this is used as a trigger for the specific skill. In our case "my parcel" is used as invocation name. A user can say "Alexa, open my parcel" to trigger a launch request or "Alexa, ask my parcel to ..." in order to trigger an intent request. 

### Intents and Utterances

  In this project we have defined 3 intents: print intent, print by date intent and order count intent. Print by date and order count intents both take a slot called timePeriod as an argument. This slot is of AMAZON.DATE type and is used to retrieve information about orders of a specific day (a user can say "yesterday" or "last friday" - Alexa will transform this into an appropriate date request). 

  You can find the full list of uttarances (things that a user may say to Alexa in order to trigger the specific intent request) under /src/utterances.txt 

  You can also find the full intent schema under /src/intent-schema.txt.  
  It is possible to copy this straight to the JSON Editor in the interaction model of your new skill.     

### AWS Lambda

  Once you have set up your interaction model with appropriate invocation name, intents, utterances and slots the next step is to add an endpoint, which Alexa will post to when it receives a request. This endpoint should contain a lambda function, which tells Alexa how to handle a certain request. 

  It is possible to create your own web-server that handles your skill requests, however it is more common to use AWS Lambda service for this purpose.

  In this project we used the latter option, which requires that you also have an account at https://aws.amazon.com/.

  You can search for Lambda in AWS services and create a new function. Before you do that, it is however important to change your region to N.Virginia as it is currently the only region that offers to use Alexa Skills Kit as a trigger for the lambda function. We used Node.js 8.10 runtime environment for our skill. For the role you can just choose to create a custom role - this should give you lambda_basic_execution in the IAM Role field - sellect allow and you can proceed to creating your function.

  So once that is done, you can add Alexa Skills Kit as a trigger and configure it by copying your skill's ID from Alexa developer console to the configuration field.

  You can find the code for the lambda function in the /myParcel/index.js file. Note the build.sh file in our root directory - this is used to push the code together with all necessary dependencies to the AWS Lambda. This requires that you have AWS CLI installed and configured. You can find the instructions for this on https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html

  Once you have AWS CLI configured you can run 

  $ bash build.sh yourLambdaFunctionName

  in the terminal and this should update the code in AWS Lambda. Note that this is a necessary step if you are using dependencies such as Axios in order to fetch or post data. 

  Once your lambda function is set up, copy the ARN code (visible on the top right side of the page) to your Alexa Skill endpoint. Save and build the model and you can begin to test it with your Alexa Echo device.

