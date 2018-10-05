const {AxiosAuth, BASE_URL} = require("./constants")

exports.handler = async (event, context) => {
  try {
    await AxiosAuth().then(async axios => {

      switch (event.request.type) {
        case "LaunchRequest":
          let result = await axios
          .get(`${BASE_URL}/shipments?filter[search]=2018-10-01&include=shipment_status`)
          .then(result => result.data.data)
          .catch(err => console.error(err))
      
          context.succeed(
            generateResponse(
              buildSpeechletResponse(`Hello, welcome to My Parcel. You have ${result.length} shipments on today's list`, true),
              {}
            )
          )
        break;

        case "IntentRequest":
          switch(event.request.intent.name) {
            case "PrintIntent":
              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`Welcome to SendMyParcel. You have successfully sent ${result.length} to print.`, true),
                  {}
                )
              )
            break;           
          default:
            throw "Invalid intent"
          }
        break;

        default:
          context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

      }
    })
  } catch(error) { context.fail(`Exception: ${error}`) }
}


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

