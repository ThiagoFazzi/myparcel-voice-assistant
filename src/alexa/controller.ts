import 'reflect-metadata'
import { JsonController, Get, NotFoundError, Param, HttpCode} from 'routing-controllers';
import { printLabels, countLabels } from '../myparcel/controller';

@JsonController()
export default class AlexaController {

  @Get('/labels/print/:date')
  @HttpCode(200)
    allLabels(
    @Param('date') date: String
    ) {
        return printLabels(date)
        .then( resp => resp)
  }

  @Get('/labels/count/:date')
  @HttpCode(200)
    getCountLabelsByDate(
      @Param('date') date: String
  ) {
    return countLabels(date)
    .then(resp => resp)
  }
}