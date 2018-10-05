const {AxiosAuth, BASE_URL} = require("./constants")
const {printPDFBuffer, print} = require('./lib/printer')

exports.handler = async (event, context) => {
  try {
    await AxiosAuth().then(async axios => {

      switch (event.request.type) {
        case "LaunchRequest":


          print("text", 'text/plain', 'alexa print order')

          let result = await axios
          .get(`/shipments?filter[search]=2018-10-05&include=shipment_status`)
          .then(result => result.data.data)
          .then(async shipments => {

            return await Promise.all(shipments.map(shipment => {
              shipment.attributes.register_at = 0
              return axios.patch('/shipments/' + shipment.id, {data: shipment})
            }))
          })
          .then(patchedShipments => {
            let ids = patchedShipments.map(a => a.id)
            context.succeed(
              generateResponse(
                buildSpeechletResponse(`Hello, welcome to My Parcel. You have ${ids.join(' ')} shipments on today's list`, true),
                {}
              )
            )
          })
          .catch(err => err.message)

          context.succeed(
            generateResponse(
              buildSpeechletResponse(result, true),
              {}
            )
          )

          //     // let files = await axios.get('/shipments/' + shipment.id + '/files')

          //     return shipment.map(patchedShipment => patchedShipment.id)
          //   })
          //     // await axios.patch('/shipments/' + shipment.id).then(async _ => await axios.get('/shipments/' + shipment.id + '/files'))
          //     // .then(async files => {
          //     //   return await files.map(async file => {
          //     //     await axios.get('/files/'+file.id).then(async buffer => {
          //     //       await printPDFBuffer(buffer, file.id)
          //     //       return file.id
          //     //     })
          //     //   })
          //     // })


          //   // return shipments.length
          //   return fileids.join(' ')
          // })
          

              // return axios.patch('/shipments/' + shipment.id).then(_ => {
              //   return axios.get('/shipments/' + shipment.id + '/files').then(files => {
              //     files.map(file => {
              //       axios.get()
              //     })
              //   })
              // })

          
          // context.succeed(
          //   generateResponse(
          //     buildSpeechletResponse(`Hello, welcome to My Parcel. You have ${result.join(' ')} shipments on today's list`, true),
          //     {}
          //   )
          // )

          // let result = await axios
          // .get(`/shipments?filter[search]=2018-10-01&include=shipment_status`)
          // .then(result => result.data.data)
          // .then(shipment => {

          //   return axios.patch('/shipments/' + shipment.id).then(_ => {
          //     return axios.get('/shipments/' + shipment.id + '/files').then(files => {
          //       files.map(file => {
          //         return axios.get('/files/'+file.id, {
          //           responseType: 'arraybuffer',
          //           headers: {
          //             Accept: 'application/pdf'
          //           }
          //         })
          //         .then(pdfBuffer => {
          //           printPDFBuffer(pdfBuffer.data)
          //         })
          //       })
          //     })
          //   })
          // })
          // .catch(err => console.error(err))
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

