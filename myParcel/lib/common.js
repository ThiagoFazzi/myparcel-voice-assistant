const Axios = require('axios')

const PI_URL = 'https://c3151774.ngrok.io'

const PiServer = async () => Axios.create({
  baseURL: PI_URL,
  headers: {
    Authorization: 'Bearer ' + await Axios.post(PI_URL + '/logins', {
      email: 'milan@milan.com', 
      password: 'test1234'
    }).then(resp => resp.data.jwt)
  }
})

// Simplify code logic
const getShipmentsCount = async (axios, date) => axios.get('/labels/count/' + date)

// Alexa speech functions
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

const say = (context, message) => context.succeed(generateResponse(buildSpeechletResponse(message, true)))

module.exports = {
  PiServer,
  say,
  getShipmentsCount,
}