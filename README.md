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


## Raspberry Pi

  The Pi is the _web_ and _printer_ server and we needed a single point for Amazon Web Services to connect to.

### Web Server

  The webserver is needed because Alexa has built in limtations.

  - Alexa will stop executing code if you didn't instruct her to say anything within 3 seconds.
  - Any POST or GET request may not exceed 24kb, if it does exceed that limit it will stop immidiatly.

  The web server should actually be moved to a static domain, for example: `alexa.sendmyparcel.com`.

### Print server

  We initially wanted the Pi to be just __a simple print server__. Since the printer is connected with a USB cable there needs to be a computer.

  We installed a __CUPS__ server and the drivers for this specific printer, which are in the __/drivers__ folder. Because the drivers for this printer are over 10 years old you cannot use the drivers from the Dymo website as they do not compile for the latest C++ compiler.

  In order to install the drivers for this printer execute the following commands:

  ```
  cd ./drivers
  patch -Np1 -i cups-ppd-header.patch
  sudo ./configure
  sudo make
  sudo make install
  ```

  Now go to the web interface for CUPS: `http://localhost:631/admin` and click `add printer`, login and the printer should be enlisted.

  It would be possible for the end-user to hook up this server to their current computer, but that would require the end-user to install the printer drivers and the printer should be accessible from outside the firewall. 
  
  This either requires opening ports on the router (insecure) or they should tunnel into a server, maybe `printers.sendmyparcel.com`

### Tunnel

  Since Alexa is running on AWS and the printer is behind a firewall, the free alternative for us was to use __ngrok__. 
  Each time it starts up it gives us a public domain name, eg `https://427bc2fa.ngrok.io`

  The command: `~/ngrok/ngrok http 4001` initiates the tunnel and ngrok forwards the http request to port 4001 in the Pi where our web server is running.

  Alexa is currently hardcoded to connect to that domain address, but this tunnel should not be needed when you want to use this software.
  Simply move the server to run on `alexa.sendmyparcel.com` or add endpoints to the current API specifically for Alexa.

  However a tunnel service is needed for the printers of your end-users. Serveo has software and a guide to host one `http://serveo.net/#self-host`.
  A simple script is then needed for the end-users printer to tunnel in (can be a simple boot script) and you should link their tunnel to their account.

  You should be able to immidiatly tunnel in to port `631` where the __CUPS__ server should be running so you can immidiatly communicate through the `Internet Printing Protocol (IPP)` from your own server.

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


