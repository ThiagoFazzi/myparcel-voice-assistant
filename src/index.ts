import 'reflect-metadata'
import { useKoaServer } from 'routing-controllers'
//import setupDb from './db'
import * as Koa from 'koa'
import AlexaController from './alexa/controller';

const app = new Koa()
const port = process.env.PORT || 4001


useKoaServer(app, {
  cors: true,
  controllers: [
    AlexaController
  ],
})

//setupDb()
//.then(_ =>
//  app.listen(port, () => console.log(`Listening on port ${port}`))
//)
//.catch(err => console.error(err))



app.listen(port, () => console.log(`Listening on port ${port}`))

