const {AxiosAuth} = require("./constants")


exports.handler = async (event, context) => {

  try {

    if (event.session.new) {
    }
    
    await AxiosAuth().then(async axios => {
    switch (event.request.type) {

      case "LaunchRequest":

      let result = await axios
      .get(`/shipments?filter[search]=2018-10-05&include=shipment_status`)
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
            if(!this.event.request.intent.slots.orderTimePeriod.value){
            context.succeed(
            generateResponse(
              buildSpeechletResponse("Let me fetch your orders", true),
              {}
            )
          )} else{
            context.succeed(
              generateResponse(
                buildSpeechletResponse(`${this.event.request.intent.slots.orderTimePeriod.value}`, true),
                {}
              )
            )
          }
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
