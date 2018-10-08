const ipp = require('ipp')
const fs = require('mz/fs')

const {
  PRINTER_IPP
} = require('../constants')

async function print(buffer, mime, name = 'Print job' ){
  let printer = ipp.Printer(PRINTER_IPP)
  let file = {
    'operation-attributes-tag': {
      'job-name': name,
      'document-format': mime
    },
    data: buffer
  }

  return await new Promise((resolve, reject) => {
    printer.execute("Print-Job", file, function (_, res) {
      resolve(res) // console.log(res.statusCode)
    })
  })
}

const printPDFFile = async (filename) => await print(await fs.readFile(filename), 'application/pdf', filename)
const printPDFBuffer = async (buffer, jobName) => await print(buffer, 'application/pdf', jobName)

module.exports = {
  print,
  printPDFBuffer,
  printPDFFile
}