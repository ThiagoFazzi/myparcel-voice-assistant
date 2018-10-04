//Write the request to API (authentication MyParcel API)

import Axios from 'axios' 
import * as request from 'superagent'
import { Credential } from './credential';
import * as fs from 'fs'


const baseUrlAuth = 'https://sandbox-auth.myparcel.com/access-token'
const baseUrl = 'https://sandbox-api.myparcel.com/v1'
const baseUrlFile = 'https://sandbox-api.myparcel.com/v1'


export const getAccessToken = (credentialKeys : Credential) => {
    request
        .post(baseUrlAuth)
        .send(credentialKeys)
        .set('Content-Type', 'application/json')
        .then(result => getShipments(result.body))
        .catch(err => console.error(err))
}

export const getShipments = (token) => {
    request
        .get(`${baseUrl}/shipments?filter[search]=2018-10-01&include=shipment_status`)
        .set('Authorization', `${token.token_type} ${token.access_token}`)
        .set('Content-Type', 'application/vnd.api+json')
        .then(result => { result.body.data
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
        .patch(`${baseUrl}/shipments/${shipmentId}`)
        .set('Authorization', `${token.token_type} ${token.access_token}`)
        .set('Content-Type', 'application/vnd.api+json')
        .send(ship)
        .then(result =>  getFile(result.body.data.id, token))
        .catch(err => console.error(err))
}

export const getFile = (shipmentId, token) => {

    request
        .get(`${baseUrl}/shipments/${shipmentId}/files`)
        .set('Authorization', `${token.token_type} ${token.access_token}`)
        .set('Content-Type', 'application/vnd.api+json')
        .then(result => { result.body.data
            .map(file => getContent(file.id, token))
        })
        .catch(err => console.error(err))
}


export const getContent = (fileId,token) => {
    Axios.get(`${baseUrlFile}/files/${fileId}`, {
        headers:{ 
            Authorization: `${token.token_type} ${token.access_token}`,
            ContentType: 'application/pdf',
            Accept: 'application/pdf',
            responseType: 'arraybuffer'

    }}).then(response => {
        //console.log(new Buffer(response.data, 'binary').toString('base64'))
        fs.writeFile("./test3.pdf", response.data, function(err) {
            if(err) {
                return console.log(err);
            }
         
         });
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




export const showFileContent = (data) =>  {
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