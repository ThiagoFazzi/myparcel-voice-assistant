import {JsonController, Get, Param} from 'routing-controllers'
import {MyParcelAuth} from '../lib/common'
import Label from './entity'


@JsonController()
export default class LabelController {

  @Get('/labels/:id')
  getLabels(
    @Param('id') id: string
  ){
    return Label.findOne(id)
  }

  @Get('/labels')
  async allPages(){
    return await MyParcelAuth().then(async user => {
      return await user.get('/shipments?filter[search]=2018-10-05&include=shipment_status').then(resp => {
        return resp.data.data.map(shipment => shipment.id)
      })
    })
  }
}