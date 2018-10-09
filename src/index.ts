import 'reflect-metadata'
import { useKoaServer } from 'routing-controllers'
import * as Koa from 'koa'
import setupDb from './db'
import AlexaController from './alexa/controller';
import UserController from './users/controller';
import LoginController from './logins/controller';
import {Action} from 'routing-controllers'
import { verify } from './jwt'
import User from './users/entity'

const app = new Koa()
const port = process.env.PORT || 4001


useKoaServer(app, {
  cors: true,
  controllers: [
    AlexaController, 
    UserController,
    LoginController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
  
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      return !!(token && verify(token))
    }
    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {data} = verify(token)
        return User.findOne(data.id)
      }
    }
    return undefined
  }
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))

