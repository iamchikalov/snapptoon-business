import { UserService } from '../services'
import {Body, Controller, Get, Headers, Patch, Put, Res} from '@nestjs/common'
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

  @Put('/api/change-user-data/:id')
  async changeUserData(
      @Param('id') id,
      @Res() res,
      @Body() userDto: UserDto
  )
  {
    console.log(userDto)

    return await this.service.changeUserData(id, userDto)
  }
}
