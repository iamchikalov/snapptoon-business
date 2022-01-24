import { Inject, Injectable } from '@nestjs/common'
import { CREATOR } from '../utils'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    @Inject(CREATOR) private readonly repository: BaseRepository<Creator>,
    private readonly jwtService: JwtService
  ) { }

  async validateUser (email: string, password: string) {
    const user = await this.repository.get({email})
    if (user && user.password === password) {
      const { password, ...result} = user
      return result
    }
    return null
  }

  async login (user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
