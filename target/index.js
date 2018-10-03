"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Alexa = require("alexa-sdk");
const controller_1 = require("./shipments/controller");
const credential_1 = require("./shipments/credential");
let handlers = {
    "PrintIntent": function () {
        let self;
        let speechOutput = "I will send your order to the printer";
        self.emit(":tellWithCard", speechOutput, "Print labels skill", speechOutput);
    }
};
class Handler {
    constructor(event, context) {
        let alexa = Alexa.handler(event, context);
        alexa.appId = "amzn1.ask.skill.e6a75a63-e5de-4635-9b68-78ec50af116f";
        alexa.registerHandlers(handlers);
        alexa.execute();
    }
}
exports.Handler = Handler;
controller_1.getAccessToken(credential_1.credentialKeys);
//# sourceMappingURL=index.js.map