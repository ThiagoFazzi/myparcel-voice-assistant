"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
const routing_controllers_1 = require("routing-controllers");
const controller_1 = require("./shipments/controller");
const credential_1 = require("./shipments/credential");
controller_1.getAccessToken(credential_1.credentialKeys);
=======
const controller_1 = require("./shipments/controller");
const credential_1 = require("./shipments/credential");
>>>>>>> 1d12bb97999b14c460d0f0c367c7695d06089c3d
exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }
        switch (event.request.type) {
            case "LaunchRequest":
                console.log(`LAUNCH REQUEST`);
                context.succeed(generateResponse(buildSpeechletResponse("Welcome to an Alexa Skill, this is running on a deployed lambda function", true), {}));
                break;
            case "IntentRequest":
                console.log(`INTENT REQUEST`);
                switch (event.request.intent.name) {
                    case "PrintIntent":
                        context.succeed(generateResponse(buildSpeechletResponse("Let me fetch your orders", true), {}));
                        break;
                    default:
                        throw "Invalid intent";
                }
                break;
            case "SessionEndedRequest":
                console.log(`SESSION ENDED REQUEST`);
                break;
            default:
                context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);
        }
    }
    catch (error) {
        context.fail(`Exception: ${error}`);
    }
};
const buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    };
};
const generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
};
<<<<<<< HEAD
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({});
app.listen(port, () => console.log(`Listening on port ${port}`));
=======
controller_1.getAccessToken(credential_1.credentialKeys);
>>>>>>> 1d12bb97999b14c460d0f0c367c7695d06089c3d
//# sourceMappingURL=index.js.map