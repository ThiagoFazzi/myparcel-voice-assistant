import * as ipp from 'ipp';
import * as fs from 'mz/fs';

import {PRINTER_IPP} from './common'

export async function printPDF(filename){
  let buffer = await fs.readFile(filename)
  let printer = ipp.Printer(PRINTER_IPP)

  let file = {
    "operation-attributes-tag": {
      "job-name": "Print Job",
      "document-format": "application/pdf"
    },
    data: buffer
  }

  return printer.execute("Print-Job", file, function (_, res) {
    return res // console.log(res.statusCode)
  })
}

export async function printStreamPDF(stream){
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
}