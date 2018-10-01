"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const Alexa = require("alexa-sdk");
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
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({});
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=index.js.map