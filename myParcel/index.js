const {AxiosAuth, BASE_URL} = require("./constants")
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

        
          //print("text", 'text/plain', 'alexa print order')

          let shipments = await getShipments(axios, '2018-10-5', context)
          shipments = shipments[0]

          await sleep(1000)

          shipments = await registerShipment(axios, shipments)

          await sleep(1000)

          let file = await getFile(axios, shipments.id)
          console.log("file: " + JSON.stringify(file))

          await sleep(1000)

          let pdf = await getContent(axios, file.data[0].id)
          console.log(pdf)

          // for(ship of shipments){
          //   ship = await registerShipment(axios, ship).then(resp => {
          //     console.log('success', resp)
          //   }).catch(err => console.log(err))
          // }

          // console.log(shipments)


          //console.log(shipments)
          context.succeed(generateResponse(buildSpeechletResponse("Hey, no error!", true), {}))
          
        
          //let ShipmentsAfterPatch =  await Promise.all(shipments.data.map(shipment => registerShipment(axios, shipment)))

          //let ShipmentsAfterPatch1 =  await Promise.all(ShipmentsAfterPatch.map(x => arr.push(x))) //{
            //return x
            //getFile(axios, x.data.id, context)
          //})) // 

          
          
          //let ShipmentsAfterPatch2 =  await Promise.all(ShipmentsAfterPatch1.map(y => getContent(axios, y.data[0].id)))

          //axios.post('http://c384581d.ngrok.io/print', { pdf: ShipmentsAfterPatch2[0]})

          //context.succeed(generateResponse(buildSpeechletResponse(JSON.stringify("test"), true), {}))

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

