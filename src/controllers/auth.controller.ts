import { Controller, Post, Body, Request, Patch } from '@nestjs/common'
import { AuthService } from '../services'
import { authDto, SetPasswordDto } from '../types/dtos'
import { VERIFY_URL } from '../utils'

@Controller()
export class AuthController {

  constructor (
    private readonly service: AuthService
  ) {}
  @Post('/api/auth-login')
  async login(@Body() data: authDto) {
    return await this.service.login(data)
  }

  @Post('/api/send-recovery-email')
  async recoveryEmail(@Body() user: authDto, @Request() request) {
    const verificationLink = `${VERIFY_URL}/recovery-password/`
    return await this.service.sendRecoveryEmail(user.email, verificationLink)
  }

  @Patch('/api/recovery-password')
  async resetPassword(@Body() token: SetPasswordDto) {
    return await this.service.resetPassword(token)
  }
}
