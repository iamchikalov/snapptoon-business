import { Controller, Get } from '@nestjs/common'
import { StaticDataService } from '../services'

@Controller()
export class StaticDataController {
  constructor (
    private readonly staticDataService: StaticDataService
  ) {}

  @Get('/api/static')
  async staticData () {
    return await this.staticDataService.getAllResponses()
  }

  @Get('/api/links')
  async getLinks () {
    return await this.staticDataService.getLinks()
  }
}
