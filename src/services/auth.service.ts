import { Inject, Injectable } from '@nestjs/common'
import { CREATOR } from '../utils'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
import { JwtService } from '@nestjs/jwt'
import { authDto } from '../types/dtos'

@Injectable()
export class AuthService {
  constructor (
    @Inject(CREATOR) private readonly repository: BaseRepository<Creator>,
    private readonly jwtService: JwtService
  ) { }

  async validateUser (email: string, password: string) {
    const user = await this.repository.get({email})
    console.log(user)
    if (user && user.password === password && user.email == email) {
      return user // TODO: make hashes comparable pass == hash
    }
    return null
  }

  async login (data: authDto) {
    console.log(data.email, "\n" + data.password)
    const user = await this.validateUser(data.email, data.password)
    const payload = { email: user.email, password: user.password, type: user.type }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
