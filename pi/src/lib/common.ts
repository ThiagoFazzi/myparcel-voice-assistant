import Axios from 'axios'

const PRINTER_NAME = 'DYMO_LabelWriter_4XL'
const PRINTER_HOST = 'localhost'
const PRINTER_PORT = 631

export const PRINTER_IPP  = 'http://' + PRINTER_HOST + ':' + PRINTER_PORT + '/printers/' + PRINTER_NAME

export const BASE_URL = 'https://sandbox-api.myparcel.com/v1'
export const BASE_URL_AUTH = 'https://sandbox-auth.myparcel.com/access-token'

export const CREDENTIALS = {
  "grant_type": "client_credentials",
  "client_id": "5eb32787-07db-4898-91e4-68b1b24d6a1a",
  "client_secret": "iah2Vg1uI6Q3i45Tq7UmjnA2J1Sse329bVRnVOE66ETk73ninmhYRac4RPng4KIy",
  "scope": "*"
}

export const MyParcelAuth = async () => Axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})