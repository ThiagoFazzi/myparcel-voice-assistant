const Axios = require("axios")

const PRINTER_NAME = 'DYMO_LabelWriter_4XL'
const PRINTER_HOST = 'http://c384581d.ngrok.io'
const PRINTER_IPP = 'http://' + PRINTER_HOST + '/printers/' + PRINTER_NAME

const BASE_URL = 'https://sandbox-api.myparcel.com/v1'
const BASE_URL_AUTH = 'https://sandbox-auth.myparcel.com/access-token'

const CREDENTIALS = {
  "grant_type": "",
  "client_id": "",
  "client_secret": "",
  "scope": "*"
}

const PI_HOST = 'https://0d9abdfc.ngrok.io'

const PiServer = async () => Axios.create({
  baseURL: PI_HOST
})

const AxiosAuth = async () => Axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: await Axios.post(BASE_URL_AUTH, CREDENTIALS).then(resp => `${resp.data.token_type} ${resp.data.access_token}`),
    Accept: 'application/vnd.api+json',
    ContentType: 'application/vnd.api+json'
  }
})

module.exports = {
  AxiosAuth,
  BASE_URL,
  PRINTER_IPP
}
