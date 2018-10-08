"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('./shipments/controller');
exports.handler = async (event, context) => {
    try {
        if (event.session.new) {
        }
        switch (event.request.type) {
            case "LaunchRequest":
                context.succeed(generateResponse(buildSpeechletResponse(`Hello`, true), {}));
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
//# sourceMappingURL=index.js.map