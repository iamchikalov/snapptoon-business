import { UserService } from '../services'
import {Body, Controller, Get, Param, Patch, Put, Res} from '@nestjs/common'
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
