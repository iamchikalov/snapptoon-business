import { UserService } from '../services'
import { Body, Controller, Get, Headers, Patch } from '@nestjs/common'
import { UserDto } from '../types/dtos'

@Controller()
export class UserController {
  constructor (
    private readonly service: UserService
  ) {}

  @Patch('/api/change-email')
  async enterNewEmail (@Body() data: UserDto) {
    return await this.service.changeEmail(data.email, data.newEmail)
  }

  @Patch('/api/change-password')
  async enterNewPassword(@Body() data: UserDto) {
    return await this.service.changePassword(data)
  }

  @Get('/api/get-user-data')
  async getUser(@Headers() access_token ){
    return this.service.getUserByToken(access_token)
  }
}
