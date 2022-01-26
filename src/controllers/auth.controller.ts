import { Controller, Post, UseGuards, Body } from '@nestjs/common'
import { AuthService } from '../services'
import { LocalAuthGuard } from '../services/guards/auth-guard.service'
import { authDto } from '../types/dtos'

@Controller()
export class AuthController {

  constructor (
    private readonly service: AuthService
  ) {}

  //@UseGuards(LocalAuthGuard) // TODO: make that shit work
  // TODO: implement JWT(maybe use them in admin page further)
  @Post('/api/auth-login')
  async login(@Body() data: authDto) {
    console.log(data.email, "\n" + data.password)
    return await this.service.login(data)
  }

}
