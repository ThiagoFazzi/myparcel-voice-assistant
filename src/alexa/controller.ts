import 'reflect-metadata'
import { JsonController, Get, NotFoundError, Param, HttpCode, Authorized} from 'routing-controllers';
import { printLabels, countLabels } from '../myparcel/controller';

@JsonController()
export default class AlexaController {

  @Authorized()
  @Get('/labels/print/:date')
  @HttpCode(200)
    allLabels(
    @Param('date') date: String
    ) {
        return printLabels(date)
        .then(resp => resp)
  }

  @Authorized()
  @Get('/labels/count/:date')
  @HttpCode(200)
    getCountLabelsByDate(
      @Param('date') date: String
  ) {
    return countLabels(date)
    .then(resp => resp)
  }
}