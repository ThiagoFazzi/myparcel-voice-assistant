import {createKoaServer} from "routing-controllers"
import * as Alexa from "alexa-sdk"
import { getAccessToken } from './shipments/controller'



let handlers: Alexa.Handlers = {
  "PrintIntent": function(){
    let self: Alexa.Handler.this
    let speechOutput = "I will send your order to the printer"
    self.emit(":tellWithCard", speechOutput, "Print labels skill", speechOutput)
  }
}

//callback: Function)

export class Handler{
  constructor(event: Alexa.RequestBody, context: Alexa.context){
    let alexa = Alexa.handler(event, context)
    alexa.appId = "amzn1.ask.skill.e6a75a63-e5de-4635-9b68-78ec50af116f"
    alexa.registerHandlers(handlers)
    alexa.execute()
  }
}


//myParcel.com credentials

const client = 
{
  "grant_type": "client_credentials",
  "client_id": "5eb32787-07db-4898-91e4-68b1b24d6a1a",
  "client_secret": "iah2Vg1uI6Q3i45Tq7UmjnA2J1Sse329bVRnVOE66ETk73ninmhYRac4RPng4KIy",
  "scope": "*"
}


getAccessToken(client)


const port = process.env.PORT || 4000

const app = createKoaServer({
})

app.listen(port, () => console.log(`Listening on port ${port}`))