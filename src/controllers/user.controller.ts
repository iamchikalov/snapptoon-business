import { UserService } from '../services'
import { Body, Controller, Get, Param, Patch, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { UserDto } from '../types/dtos'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string'
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        logo: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'logo', maxCount: 1 }]))
  async changeUserData (
    @UploadedFiles() file: { logo: Express.Multer.File[] },
    @Body() userDto: UserDto
  ) {
    return await this.service.changeUserData(file, userDto)
  }
}
