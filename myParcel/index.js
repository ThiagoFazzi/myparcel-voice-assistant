const {AxiosAuth, PrinterAuth, BASE_URL} = require("./constants")
const {printPDFBuffer, print} = require('./lib/printer')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getShipments = (axios, date) => {
  console.log(`${BASE_URL}/shipments?filter[search]=2018-10-05&include=shipment_status`)
  return axios
    .get(`${BASE_URL}/shipments?filter[search]=2018-10-05&include=shipment_status`)
    .then(response =>  response.data.data)
    .catch(err => err)
}

const registerShipment = (axios, shipment) => {
  shipment.attributes.register_at = 0
  const ship = {
    data: shipment
  }
  console.log(`fetching data from: ${BASE_URL}/shipments/${shipment.id}`)
  return axios
    .patch(`${BASE_URL}/shipments/${shipment.id}`,ship)
    .then(response =>  response.data.data)
    .catch(err => err)
}

const getFile = async (axios, shipmentId) => {
  console.log(`getting file from: ${BASE_URL}/shipments/${shipmentId}`)
  return await axios
    .get(`${BASE_URL}/shipments/${shipmentId}/files`)
    .then(response => response.data)
    .catch(err => err)
}

const getContent = (axios, fileId) => {
  console.log(`getting content from: ${BASE_URL}/files/${fileId}`)
  return axios.get(`${BASE_URL}/files/${fileId}`, {
    responseType: 'arraybuffer',
    headers: {
      Accept: 'application/pdf'
    }
  })
    .then(response => {
      console.log("resp", response)
      axios.post('http://c384581d.ngrok.io/print', { pdf: Buffer.from(response.data, 'base64')})
      //console.log(JSON.stringify(Buffer.from(response.data, 'base64')))
      return response.data
    })
    //.then(response => Buffer.from(response.data, 'base64'))
    .catch(err => console.log(err))
}

exports.handler = async (event, context) => {
  try {
    await AxiosAuth().then(async axios => {

      switch (event.request.type) {
        case "LaunchRequest":
          let numberOfLabels = await PrinterAuth.then(async user => await user.get('/labels'))

          context.succeed(generateResponse(buildSpeechletResponse(`Welcome to MyParcel. You have ${numberOfLabels} for today` , true), {}))
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

