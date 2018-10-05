export const PRINTER_NAME = 'DYMO_LabelWriter_4XL'
export const PRINTER_HOST = '172.16.30.72:631'
export const PRINTER_IPP = 'http://' + PRINTER_HOST + '/printers/' + PRINTER_NAME

export const BASE_URL = 'https://sandbox-api.myparcel.com/v1'
export const BASE_URL_AUTH = 'https://sandbox-auth.myparcel.com/access-token'

export const CREDENTIALS = {
  "grant_type": "client_credentials",
  "client_id": "5eb32787-07db-4898-91e4-68b1b24d6a1a",
  "client_secret": "iah2Vg1uI6Q3i45Tq7UmjnA2J1Sse329bVRnVOE66ETk73ninmhYRac4RPng4KIy",
  "scope": "*"
}