import Axios from 'axios'
import * as request from 'superagent'
import { Credential } from './credential';

import { 
  printPDFBuffer 
} from '../lib/printer'

import {
  BASE_URL,
  BASE_URL_AUTH,
  CREDENTIALS
} from '../lib/common'

const AxiosAuth = async () => Axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: await Axios.post(BASE_URL_AUTH, CREDENTIALS).then(resp => `${resp.data.token_type} ${resp.data.access_token}`),
    Accept: 'application/vnd.api+json',
    ContentType: 'application/vnd.api+json'
  }
})

export const getShipments = (axios, date) => {
  return axios
    .get(`${BASE_URL}/shipments?filter[search]=2018-10-05&include=shipment_status`)
    .then(response =>  response.data)
    .catch(err => console.error(err))
}

export const registerShipment = (axios, shipment) => {
  shipment.attributes.register_at = 0
  return axios
    .patch(`${BASE_URL}/shipments/${shipment.id}`,{data: shipment})
    .then(response =>  response.data)
    .catch(err => console.error(err))
}

export const getFile = (axios, shipmentId) => {
  return axios
    .get(`${BASE_URL}/shipments/${shipmentId}/files`)
    .then(response =>  response.data)
    .catch(err => console.error(err))
}

export const getContent = (axios, fileId) => {
  return axios.get(`${BASE_URL}/files/${fileId}`)
    .then(response => {/*printStreamPDF(Buffer.from(response.data, 'base64'))*/ })
    .catch(err => console.log(err))
}


/*
AxiosAuth().then(async axios => {
  let shipments = await getShipments(axios)
  shipments.data
    .map(async shipment => {
      await registerShipment(axios, shipment.id)
    })  
})
*/





