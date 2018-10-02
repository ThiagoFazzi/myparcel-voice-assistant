import {createKoaServer} from "routing-controllers"
import * as Alexa from "alexa-sdk"

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




const port = process.env.PORT || 4000

const app = createKoaServer({
})

app.listen(port, () => console.log(`Listening on port ${port}`))