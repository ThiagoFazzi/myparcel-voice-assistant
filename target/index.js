"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const Alexa = require("alexa-sdk");
const controller_1 = require("./shipments/controller");
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
const client = {
    "grant_type": "client_credentials",
    "client_id": "5eb32787-07db-4898-91e4-68b1b24d6a1a",
    "client_secret": "iah2Vg1uI6Q3i45Tq7UmjnA2J1Sse329bVRnVOE66ETk73ninmhYRac4RPng4KIy",
    "scope": "*"
};
controller_1.getAccessToken(client);
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({});
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=index.js.map