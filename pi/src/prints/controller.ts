import {JsonController, Get, Param} from 'routing-controllers'
import {MyParcelAuth} from '../lib/common'



@JsonController()
export default class PrintController {

  @Get('/prints/:id')
  async getLabel(
    @Param('id') id: string
  ){
    
  }

  @Get('/prints')
  async allPages(){

  }
}