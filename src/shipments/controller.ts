//Write the request to API (authentication MyParcel API)

import Axios from 'axios'
import * as request from 'superagent'
import { Credential } from './credential';
import * as fs from 'fs'
//import { printStreamPDF } from '../lib/printer'


const baseUrlAuth = 'https://sandbox-auth.myparcel.com/access-token'
const baseUrl = 'https://sandbox-api.myparcel.com/v1'
const baseUrlFile = 'https://sandbox-api.myparcel.com/v1'


/*
export const getAccessToken = (credentialKeys: Credential) => {
  request
    .post(baseUrlAuth)
    .send(credentialKeys)
    .set('Content-Type', 'application/json')
    .then(result => getShipments(result.body))
    .catch(err => console.error(err))
}
*/



const AxiosAuth = Promise.resolve(resolve => {
   Axios.post(baseUrlAuth, {
  "grant_type": "client_credentials",
  "client_id": "5eb32787-07db-4898-91e4-68b1b24d6a1a",
  "client_secret": "iah2Vg1uI6Q3i45Tq7UmjnA2J1Sse329bVRnVOE66ETk73ninmhYRac4RPng4KIy",
  "scope": "*"
  }, {
    headers: {
      ContentType: 'application/json'
    }
  }).then(resp => {
    resolve(Axios.create({
    baseURL: 'https://sandbox-api.myparcel.com/v1',
    headers: {
      Authorization: `${resp.data.token_type} ${resp.data.token.access_token}`,
      Accept: 'application/vnd.api+json',
      ContentType: 'application/vnd.api+json'
    }
  }))
})


console.log(AxiosAuth)


/*
export const getShipments = (token) => {
  Axios.get(`${baseUrl}/shipments?filter[search]=2018-10-01&include=shipment_status`, {
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
      Accept: 'application/vnd.api+json',
      ContentType: 'application/vnd.api+json'
    }
  })
  .then(resp => { resp.data.data
    .map(shipment => registerShipment(shipment.id, shipment, token))
  })
  .catch(err => {
    console.log(err)
  })
}
*/


/*
2. Register the shipment with the carrier: 
PATCH https://sandbox-api.myparcel.com/v1/shipments/{shipment_id} 
(To register with the carrier, patch the `register_at` property to `0`
*/

export const registerShipment = (shipmentId, shipment, token) => {
  shipment.attributes.register_at = 0

  const ship = {
    data: shipment
  }

  //console.log('object before send', ship)

  request
    .patch(`${baseUrl}/shipments/${shipmentId}`)
    .set('Authorization', `${token.token_type} ${token.access_token}`)
    .set('Content-Type', 'application/vnd.api+json')
    .send(ship)
    .then(result => getFile(result.body.data.id, token))
    .catch(err => console.error(err))
}

export const getFile = (shipmentId, token) => {

  request
    .get(`${baseUrl}/shipments/${shipmentId}/files`)
    .set('Authorization', `${token.token_type} ${token.access_token}`)
    .set('Content-Type', 'application/vnd.api+json')
    .then(result => {
      result.body.data
      .map(file => getContent(file.id, token))
    })
    .catch(err => console.error(err))
}


export const getContent = (fileId, token) => {
  console.log(`${baseUrlFile}/files/${fileId}`)
  Axios.get(`${baseUrlFile}/files/${fileId}`, {
    responseType: 'arraybuffer',
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
      Accept: 'application/pdf',
    }
  }).then(response => {
    console.log(response.data)
    //printStreamPDF(Buffer.from(response.data, 'base64'))
  }).catch(err => {
    console.log(err)
  })
}




export const showFileContent = (data) => {
  console.log(data)
}



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