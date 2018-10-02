"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipp = require("ipp");
const fs = require("mz/fs");
const common_1 = require("./common");
async function printPDF(filename) {
    let buffer = await fs.readFile(filename);
    let printer = ipp.Printer(common_1.PRINTER_IPP);
    let file = {
        "operation-attributes-tag": {
            "job-name": "Print Job",
            "document-format": "application/pdf"
        },
        data: buffer
    };
    return printer.execute("Print-Job", file, function (_, res) {
        return res;
    });
}
exports.printPDF = printPDF;
//# sourceMappingURL=printer.js.map