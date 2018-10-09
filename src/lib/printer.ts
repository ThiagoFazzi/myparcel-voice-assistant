import * as ipp from 'ipp';
import * as fs from 'mz/fs';

import {PRINTER_IPP} from './common'

async function print(buffer, mime, name = 'Print job' ){
  let printer = ipp.Printer(PRINTER_IPP)
  let file = {
    'operation-attributes-tag': {
      'job-name': name,
      'document-format': mime
    },
    data: buffer
  }

  return await new Promise((resolve) => {
    printer.execute("Print-Job", file, function (_, res) {
      resolve(res) // console.log(res.statusCode)
    })
  })
}

export const printPDFFile = async (filename) => await print(await fs.readFile(filename), 'application/pdf', filename)
export const printPDFBuffer = async (buffer) => await print(buffer, 'application/pdf')


/*export async function printStreamPDF(stream){
  let printer = ipp.Printer(PRINTER_IPP)

  let file = {
    "operation-attributes-tag": {
      "job-name": "Print Job",
      "document-format": "application/pdf"
    },
    data: stream
  }

  return printer.execute("Print-Job", file, function (_, res) {
    return res // console.log(res.statusCode)
  })
}*/
