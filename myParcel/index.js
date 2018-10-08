const {AxiosAuth, BASE_URL} = require("./constants")
const {printPDFBuffer, print} = require('./lib/printer')
const Axios = require('axios')

const PI_HOST = 'https://c377c715.ngrok.io' || 'http://c377c715.ngrok.io'

const PiServer = async () => Axios.create({
  baseURL: PI_HOST
})

const say = (context, message) => context.succeed(generateResponse(buildSpeechletResponse(message, true)))

let today = new Date()
let day = today.getDate()
let month = today.getMonth()
let year = today.getFullYear()
let fullDate = `${year}-${month+1}-${day}`

const getShipmentsCount = async (axios, date) => axios.get('/labels/count/' + date)


exports.handler = async (event, context) => {
  try {
    await PiServer().then(async axios => {
      switch (event.request.type) {

        case "LaunchRequest": console.log('LaunchRequest')
          await getShipmentsCount(axios, fullDate)
            .then(resp => 
              say(context, `Hello, welcome to My Parcel. You have ${resp.data} shipment${parseInt(resp.data) > 1 ? 's' : ''} on today's list`))
            .catch(err => 
              say(context, `I'm sorry, I could not connect to the server`))
          break;        
  
        case "IntentRequest": console.log('IntentRequest')

          switch (event.request.intent.name) {
            case "PrintIntent": console.log('PrintIntent')

            await axios.get(`/labels/print/${fullDate}`)
            // .then(resp =>
            //   say(context, 'Posted'))
            // .catch(err => 
            //   say(context, 'Not posted'))

            await getShipmentsCount(axios, fullDate)
            .then(resp => 
              say(context, `I have sent ${resp.data} label${parseInt(resp.data) > 1 ? 's' : ''} to the printer`))
            .catch(err => 
              say(context, `I'm sorry, I could not connect to the server`))
            break;
  
            case "PrintByDateIntent":
              let date = event.request.intent.slots.timePeriod.value
  
              await axios.get(`/labels/print/${date}`)
  
              await getShipmentsCount(axios, date)
              .then(resp => 
                say(context, `I have sent ${resp.data} label${parseInt(resp.data) > 1 ? 's' : ''} to the printer`))
              .catch(err => 
                say(context, `I'm sorry, I could not connect to the server`))
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




