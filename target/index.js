"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./shipments/controller");
const credential_1 = require("./shipments/credential");
const request = require("superagent");
exports.handler = async (event, context) => {
    try {
        if (event.session.new) {
        }
        switch (event.request.type) {
            case "LaunchRequest":
                let result = await request
                    .get("https://swapi.co/api/people/1/")
                    .then(result => result.body.data.name)
                    .catch(err => console.error(err));
                context.succeed(generateResponse(buildSpeechletResponse(`${result}`, true), {}));
                break;
            case "IntentRequest":
                switch (event.request.intent.name) {
                    case "PrintIntent":
                        context.succeed(generateResponse(buildSpeechletResponse("Let me fetch your orders", true), {}));
                        break;
                    default:
                        throw "Invalid intent";
                }
                break;
            case "SessionEndedRequest":
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
controller_1.getAccessToken(credential_1.credentialKeys);
//# sourceMappingURL=index.js.map