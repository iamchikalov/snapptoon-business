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
  async enterNewPassword (@Body() data: UserDto) {
    return await this.service.changePassword(data)
  }

  @Get('/api/get-user-data/:token')
  async getUser (@Param('token') token: string) {
    return await this.service.getUserByToken(token)
  }

  @Patch('/api/change-user-data')
  async changeUserData (@Body() userDto: UserDto) {
    return await this.service.changeUserData(userDto)
  }
}
