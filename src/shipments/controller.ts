//Write the request to API (authentication MyParcel API)

import * as request from 'superagent'

const baseUrlAuth = 'https://sandbox-auth.myparcel.com/access-token'

const baseUrl = 'https://sandbox-api.myparcel.com/v1'

export const getAccessToken = (client) => {
    request
        .post(baseUrlAuth)
        .send(client)
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
            .map(shipment => registerShipment(shipment.id, token))
        })
        .catch(err => console.error(err))
}

/*
2. Register the shipment with the carrier: 
PATCH https://sandbox-api.myparcel.com/v1/shipments/{shipment_id} 
(To register with the carrier, patch the `register_at` property to `0`
*/

export const registerShipment = (shipmentId, token) => {

    request
        .patch(`${baseUrl}/shipments/${shipmentId}`)
        .set('Authorization', `${token.token_type} ${token.access_token}`)
        .set('Content-Type', 'application/vnd.api+json')
        .send({register_at: 0})
        .then(result => { console.log(result.body.data.attributes.register_at)
            //.map(file => getContent(file.id, token))
        })
        .catch(err => console.error(err))
}



/*


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


export const getContent = (fileId, token) => {
    console.log(fileId)
    request
        .get(`${baseUrl}/files/${fileId}`)
        .set('Authorization', `${token.token_type} ${token.access_token}`)
        //.set('Content-Type', 'application/pdf')
        .set('Accept', 'application/pdf')
        //.then(result => console.log(result.body))
        .then(result => showFileContent(result.body))
        .catch(err => console.error(err))
}

export const showFileContent = (data) =>  {
   console.log(data)
}

*/