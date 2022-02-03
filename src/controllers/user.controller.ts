import { UserService } from '../services'
import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
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

  @Get('/api/get-user-data/:id')
  async getUser(@Param('id') id){
    return this.service.getUser(id);
  }
}
