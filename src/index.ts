//import * as Alexa from "alexa-sdk"
import { getAccessToken } from './shipments/controller'
import { credentialKeys }  from './shipments/credential'
import * as request from 'superagent'
// import {printPDF} from './lib/printer'   UNCOMMENT THIS
// import axois from 'Axios'                UNCOMMENT THIS


//const file = './labels/testlabel.pdf'     UNCOMMENT THIS
//printPDF(file) // comment out to avoid wasting paper.

exports.handler = async (event, context) => {

  try {

    if (event.session.new) {
    }

    switch (event.request.type) {

      case "LaunchRequest":

      let result = await request
      .get("https://swapi.co/api/people/1/")
      .then(result => result.body.data.name)
      .catch(err => console.error(err))
        context.succeed(
          generateResponse(
            buildSpeechletResponse(`${result}`, true),
            {}
          )
        )
        break;

      case "IntentRequest":
        switch(event.request.intent.name) {
          case "PrintIntent":
            context.succeed(
            generateResponse(
              buildSpeechletResponse("Let me fetch your orders", true),
              {}
            )
          )
          break;
            
          default:
            throw "Invalid intent"
        }

        break;

      case "SessionEndedRequest":
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
const buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

const generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}

//Start process to fetch Shipments from the myParcel.com API
getAccessToken(credentialKeys)


