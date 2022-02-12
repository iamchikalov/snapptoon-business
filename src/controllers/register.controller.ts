import { Body, Request, Controller, Post, Patch } from '@nestjs/common'
import {RegisterService} from '../services';
import {RegisterDto, VerificationTokenDto} from '../types/dtos';


@Controller()
export class RegisterController {
    constructor(
        private service: RegisterService
    ) {}

    @Post('/api/register')
    async register(@Body() registerDTO: RegisterDto, @Request() request) {
      const verificationLink = `${request.protocol}://${request.headers.hostname}/verify-account/`
      console.log(verificationLink)
      return await this.service.createAccount(registerDTO, verificationLink)
    }

    @Patch('/api/verify-account')
    async verify(@Body() token: VerificationTokenDto) {
      return await this.service.verifyAccount(token)
    }
}
