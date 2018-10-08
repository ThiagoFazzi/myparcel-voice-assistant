const {AxiosAuth, BASE_URL} = require("./constants")
const {printPDFBuffer, print} = require('./lib/printer')
const Axios = require('axios')

const PI_HOST = 'https://0d9abdfc.ngrok.io' || 'http://0d9abdfc.ngrok.io'

const PiServer = async () => Axios.create({
  baseURL: PI_HOST
})

const say = (context, message) => context.succeed(generateResponse(buildSpeechletResponse(message, true)))

const getShipmentsCount = async (axios, date = '2018-10-05') => axios.get('/labels/count/' + date)



exports.handler = async (event, context) => {
  try {
    await PiServer().then(async axios => {
      switch (event.request.type) {
        case "LaunchRequest": console.log('LaunchRequest')
          axios.post('/labels/print/2018-10-05')
          await getShipmentsCount(axios)
            .then(resp => 
              say(context, `Hello, welcome to My Parcel. You have ${resp.data} shipment${parseInt(resp.data) > 1 ? 's' : ''} on today's list`))
            .catch(err => 
              say(context, `I'm sorry, I could not connect to the server`))
          break;

          
  
        case "IntentRequest": console.log('IntentRequest')
          switch (event.request.intent.name) {
            case "PrintIntent": console.log('PrintIntent')
  
            let orderCount = await getShipments(axios, fullDate)
  
            context.succeed(
              generateResponse(
                buildSpeechletResponse(`I am sending ${orderCount.length} orders to the printer`, true), {}
              )
            )
            break;
  
            case "PrintByDateIntent":
              let date = event.request.intent.slots.timePeriod.value
              let orderCountOfDate = await getShipments(axios, date)
  
              context.succeed(
                generateResponse(
                  buildSpeechletResponse(`I am sending ${orderCountOfDate.length} orders to the printer`, true), {}
                )
              )
              break;
  
            default:
              throw "Invalid intent"
          }
  
        default:
          context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)
        
      }

    }).catch(err => say(context, "There was a problem connecting to the response server"))
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

const getContent = (axios, fileId) => {
  return axios.get(`${BASE_URL}/files/${fileId}`, {
    responseType: 'arraybuffer',
    headers: {
      Accept: 'application/pdf',
      ContentType: 'application/pdf' 
    }
  })
    //.then(response => console.log(response))
    .then(response => { printPDFBuffer(Buffer.from(response.data, 'base64'))})
    //.then(response => console.log('yes'))
    .catch(err => console.log(err))
}

let today = new Date()
let day = today.getDate()
let month = today.getMonth()
let year = today.getFullYear()
let fullDate = `${year}-${month+1}-${day}`



