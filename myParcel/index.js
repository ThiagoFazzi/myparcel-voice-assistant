const {AxiosAuth, PrinterAuth, BASE_URL} = require("./constants")
const {printPDFBuffer, print} = require('./lib/printer')

exports.handler = async (event, context) => {
  //try {
    //await AxiosAuth().then(async axios => {

      switch (event.request.type) {
        case "LaunchRequest":
          let shipments = PrinterAuth().then(async user => await user.get('/labels'))
          console.log(shipments)
          let word = shipments.data.length > 1 ? 'shipments' : 'shipment'

          context.succeed(generateResponse(buildSpeechletResponse(`Welcome to MyParcel. You have ${shipments.data.length + ' ' + word} scheduled for today` , true), {}))
        break;

        case "IntentRequest":
          // switch(event.request.intent.name) {
          //   case "PrintIntent":
          //     context.succeed(
          //       generateResponse(
          //         buildSpeechletResponse(`Welcome to SendMyParcel. You have successfully sent ${result.length} to print.`, true),
          //         {}
          //       )
          //     )
          //   break;           
          // default:
          //   throw "Invalid intent"
          // }
        break;

        default:
          context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

      }
    //})
  //} catch(error) { context.fail(`Exception: ${error}`) }
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

