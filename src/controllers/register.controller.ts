import { Body, Controller, Post } from '@nestjs/common'
import {RegisterService} from '../services';
import {RegisterDto} from '../types/dtos';


@Controller()
export class RegisterController {
    constructor(
        private service: RegisterService
    ) { }

    @Post('/api/register')
    async register(@Body() registerDTO: RegisterDto) {
      return await this.service.createAccount(registerDTO)
    }

    @Post('/api/verify-account')
    async verify(token: string) {

    }
}
