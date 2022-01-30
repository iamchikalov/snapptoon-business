import { Inject, Injectable } from '@nestjs/common'
import { CREATOR } from '../utils'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
import { JwtService } from '@nestjs/jwt'
import { authDto } from '../types/dtos'
import { customError } from '../errors/custom.error'
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
  constructor (
    @Inject(CREATOR) private readonly repository: BaseRepository<Creator>,
    private readonly jwtService: JwtService
  ) { }

  async validateUser (email: string, password: string) {
    const user = await this.repository.get({email})
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (isValidPassword && user) {
      return user
    }
    return null
  }


  async login (data: authDto) {
    const user = await this.validateUser(data.email, data.password)
    if (user == null) {
      return customError.INVALID_PASSWORD()
    }

    const accessToken = { email: user.email, type: user.type }
    const refreshToken = { email: user.email, name: user.name }

    return {
      access_token: this.jwtService.sign(accessToken),
      refresh_token: this.jwtService.sign(refreshToken)
    }
  }

}
