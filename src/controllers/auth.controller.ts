import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from '../services'
import { authDto } from '../types/dtos'

@Controller()
export class AuthController {

  constructor (
    private readonly service: AuthService
  ) {}
  @Post('/api/auth-login')
  async login(@Body() data: authDto) {
    return await this.service.login(data)
  }

}
