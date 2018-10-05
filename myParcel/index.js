//import * as Alexa from "alexa-sdk"
// import { getAccessToken } from './shipments/controller'
// import { credentialKeys }  from './shipments/credential'
const request = require("superagent")
const Axios = require("axios")
//import * as request from 'superagent'
// import {printPDF} from './lib/printer'   UNCOMMENT THIS
//const file = './labels/testlabel.pdf'     UNCOMMENT THIS
//printPDF(file) // comment out to avoid wasting paper.

const BASE_URL = 'https://sandbox-api.myparcel.com/v1'
const BASE_URL_AUTH = 'https://sandbox-auth.myparcel.com/access-token'
const CREDENTIALS = {
  "grant_type": "client_credentials",
  "client_id": "5eb32787-07db-4898-91e4-68b1b24d6a1a",
  "client_secret": "iah2Vg1uI6Q3i45Tq7UmjnA2J1Sse329bVRnVOE66ETk73ninmhYRac4RPng4KIy",
  "scope": "*"
}

const AxiosAuth = async () => Axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: await Axios.post(BASE_URL_AUTH, CREDENTIALS).then(resp => `${resp.data.token_type} ${resp.data.access_token}`),
    Accept: 'application/vnd.api+json',
    ContentType: 'application/vnd.api+json'
  }
})

exports.handler = async (event, context) => {

  try {

    if (event.session.new) {
    }

    switch (event.request.type) {

      case "LaunchRequest":

      await AxiosAuth().then(async axios => {
      let result = await axios
      .get(`${BASE_URL}/shipments?filter[search]=2018-10-01&include=shipment_status`)
      .then(result => result.data.data)
      .catch(err => console.error(err))
      
        context.succeed(
          generateResponse(
            buildSpeechletResponse(`Hello, you have ${result.length} orders today`, true),
            {}
            )
          )
        })
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

// //Start process to fetch Shipments from the myParcel.com API
// getAccessToken(credentialKeys)


