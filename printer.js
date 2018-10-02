
/*

const ipp = require("ipp");
const fs = require('mz/fs')
const pdfjs = require('pdfjs-dist');

async function printPDF(filename){
  let buffer = await fs.readFile(filename + '.pdf')
}


async function readPDF() {
  // Read file into buffer
  const buffer = await fs.readFile('testlabel.pdf')
  const printer = ipp.Printer("http://172.16.30.72:631/printers/DYMO_LabelWriter_4XL");

  const file = {
    "operation-attributes-tag":{
        "requesting-user-name": "User",
    "job-name": "Print Job",
    "document-format": "application/pdf"
    },
    data: buffer
  }

  printer.execute("Print-Job", file, function (err, res) {
    console.log("Printed: "+res.statusCode);
  });
};

readPDF()*/