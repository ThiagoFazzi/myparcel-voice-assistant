"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./shipments/controller");
const credential_1 = require("./shipments/credential");
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
controller_1.getAccessToken(credential_1.credentialKeys);
//# sourceMappingURL=index.js.map