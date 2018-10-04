import Axios from 'axios'
import * as request from 'superagent'
import { Credential } from './credential';

import { 
  printPDFBuffer 
} from '../lib/printer'

import {
  BASE_URL,
  BASE_URL_AUTH,
  BASE_URL_FILES,
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

export const getAccessToken = (credentialKeys: Credential) => {
  request
    .post(BASE_URL_AUTH)
    .send(credentialKeys)
    .set('Content-Type', 'application/json')
    .then(result => getShipments(result.body))
    .catch(err => console.error(err))
}

export const getShipments2 = (axios) => {
  axios
    .get(`${BASE_URL}/shipments?filter[search]=2018-10-01&include=shipment_status`)
    .then(result => {
      result.data
        .map(shipment => registerShipment)
    })
    .catch(err => console.error(err))

}

export const getShipments = (token) => {
  request
    .get(`${BASE_URL}/shipments?filter[search]=2018-10-01&include=shipment_status`)
    .set('Authorization', `${token.token_type} ${token.access_token}`)
    .set('Content-Type', 'application/vnd.api+json')
    .then(result => {
      result.body.data
        .map(shipment => registerShipment(shipment.id, shipment, token))
    })
    .catch(err => console.error(err))
}

/*
2. Register the shipment with the carrier: 
PATCH https://sandbox-api.myparcel.com/v1/shipments/{shipment_id} 
(To register with the carrier, patch the `register_at` property to `0`
*/

export const registerShipment = (shipmentId, shipment, token) => {
  //console.log(token)
  //console.log(shipmentId)
  //console.log(shipment)

  shipment.attributes.register_at = 0

  const ship = {
    data: shipment
  }

  //console.log('object before send', ship)

  request
    .patch(`${BASE_URL}/shipments/${shipmentId}`)
    .set('Authorization', `${token.token_type} ${token.access_token}`)
    .set('Content-Type', 'application/vnd.api+json')
    .send(ship)
    .then(result => getFile(result.body.data.id, token))
    .catch(err => console.error(err))
}

export const getFile = (shipmentId, token) => {

  request
    .get(`${BASE_URL}/shipments/${shipmentId}/files`)
    .set('Authorization', `${token.token_type} ${token.access_token}`)
    .set('Content-Type', 'application/vnd.api+json')
    .then(result => {
      result.body.data
        .map(file => getContent(file.id, token))
    })
    .catch(err => console.error(err))
}


export const getContent = (fileId, token) => {
  Axios.get(`${BASE_URL_FILES}/files/${fileId}`, {
    responseType: 'arraybuffer',
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
      //ContentType: 'application/pdf',
      Accept: 'application/pdf',
    }
  }).then(response => {
    //console.log(response.data)
    //printStreamPDF(Buffer.from(response.data, 'base64'))


  }).catch(err => {
    console.log(err)
  })
  /*//request
  //    .get(`${baseUrlFile}/files/${fileId}`)
  //    .set('Authorization', `${token.token_type} ${token.access_token}`)
  //    //.set('Content-Type', 'application/pdf')
  //    .set('Accept', 'application/pdf')
      .responseType('pdf')
      //.buffer(true)
      //.then(result => console.log(result.body))
      .then(result => { console.log(result.body) })
      .catch(err => console.error(err))*/
}




export const showFileContent = (data) => {
  console.log(data)
}


AxiosAuth().then(axios => {

})


/*
1. Fetch shipments for today: 
    GET https://sandbox-api.myparcel.com/v1/shipments?filter[search]=2018-10-01&include=shipment_status 
    (I just noticed we do not currently offer a way of filtering shipments by status, so you'll have to 
    do that filtering on your side)

2. Register the shipment with the carrier: 
    PATCH https://sandbox-api.myparcel.com/v1/shipments/{shipment_id} 
    (To register with the carrier, patch the `register_at` property to `0`)

3. Retrieve files related to the shipment:
    GET https://sandbox-api.myparcel.com/v1/shipments/{shipment_id}/files

4. Retrieve the contents of the file: 
    https://sandbox-api.myparcel.com/v1/files/{file_id} 
    (With `Accept` header set to `application/pdf`
*/