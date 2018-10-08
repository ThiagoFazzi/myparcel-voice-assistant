import {JsonController, Get, Param} from 'routing-controllers'
import Label from './entity'


@JsonController()
export default class LabelController {

  @Get('/labels/:id')
  getLabels(
    @Param('id') id: number
  ) {
    return Label.findOne(id)
  }

  @Get('/labels')
  allPages() {
    return "Hi Bob!"
  }
}