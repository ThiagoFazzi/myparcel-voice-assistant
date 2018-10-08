import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'

import LabelsController from './labels/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [
    LabelsController
  ],
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log('Listening on port: ' + port))
  )
  .catch(err => console.error(err))