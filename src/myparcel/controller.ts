import Axios from 'axios'
import { sendToPrinter } from '../printer/controller'

import { 
  printPDFBuffer 
} from '../lib/printer'

import {
  BASE_URL,
  BASE_URL_AUTH,
  CREDENTIALS
} from '../lib/common'

export const AxiosAuth = async () => Axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: await Axios.post(BASE_URL_AUTH, CREDENTIALS).then(resp => `${resp.data.token_type} ${resp.data.access_token}`),
    Accept: 'application/vnd.api+json',
    ContentType: 'application/vnd.api+json'
  }
})

export const getShipments = (axios, date) => {
  return axios
    .get(`${BASE_URL}/shipments?filter[search]=${date}&include=shipment_status`)
    .then(response =>  response.data.data)
    .catch(err => console.error(err))
}

export const registerShipment = (axios, shipment) => {
  shipment.attributes.register_at = 0
  const ship = {
    data: shipment
  }
  return axios
    .patch(`${BASE_URL}/shipments/${shipment.id}`,ship)
    .then(response =>  response.data.data)
    .catch(err => console.error(err))
}

export const getFile = (axios, shipmentId) => {
  return axios
    .get(`${BASE_URL}/shipments/${shipmentId}/files`)
    .then(response =>  response.data.data)
    .catch(err => console.error(err))
}

export const getContent = (axios, fileId) => {
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


const createFiles  = async(date) => { 
  let axios  =  await AxiosAuth() 
  let shipments = await getShipments(axios, date)
    .then(shipments => Promise.all(shipments.map(shipment => registerShipment(axios, shipment))))
    .then(shipmentsRegistered => Promise.all(shipmentsRegistered.map(shipmentRegistered => getFile(axios, shipmentRegistered.id))))
    .then(shipmentsFiles => Promise.all(shipmentsFiles.map(shipmentFile => shipmentFile.map(shipmentFileId => getContent(axios, shipmentFileId.id)))))
    //.then(shipmentsFiles => Promise.all(shipmentsFiles.map(shipmentFile => shipmentFile.map(x => getContent(axios, x.id)))))
    .catch(error => console.log(error))
  return shipments
  
}

//Thiago check this function down here, i replaced getContent with console.log() but Printer Promise pending is still showing
export const  printLabels = (date) =>{
   return createFiles(date)
    //.then(labels => sendToPrinter(labels))
    .then(resp => resp)
    .then(() =>  Promise.resolve('LABELS PRINTED!!!!!'))
    .catch(err => console.log(err))
}

export const countLabels = (date) => {
  return AxiosAuth()
  .then(axios => getShipments(axios, date))
  .then(resp => resp.length)
  .catch(err => console.log(err))
}


//let ShipmentsAfterPatch = <any> await Promise.all(shipments.data.map(shipment => registerShipment(axios, shipment)))      
//let ShipmentsAfterPatch1 = <any> await Promise.all(ShipmentsAfterPatch.map(x=> getFile(axios, x.data.id)))
//let ShipmentAfterPatch2 = <any> await Promise.all(ShipmentsAfterPatch1.map(y => getContent(axios, y.data[0].id)))