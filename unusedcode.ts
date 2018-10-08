          // for(ship of shipments){
          //   ship = await registerShipment(axios, ship).then(resp => {
          //     console.log('success', resp)
          //   }).catch(err => console.log(err))
          // }

          // console.log(shipments)


          //console.log(shipments)
          
          
        
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