import {
  changePasswordComparator,
  comparePasswords,
  isValidEmail,
  CREATOR,
  SALT_ROUNDS
} from '../utils'
import { Inject, Injectable } from '@nestjs/common'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
import { customError } from '../errors/custom.error'
import { UserDto } from '../types/dtos'
import { UserProfileMapper } from "../mappers/user-profile.mapper"
import jwtDecode from "jwt-decode"
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
  userProfileMapper = new UserProfileMapper()
  constructor (
    @Inject(CREATOR) private readonly repository: BaseRepository<Creator>
  ) {}

  async changeEmail (
    oldEmail: string,
    newEmail: string
  ) {

    if (!isValidEmail(newEmail)) {
      return customError.INVALID_EMAIL()
    }

    if (await this.existByEmail(oldEmail)) {
      return customError.EMAIL_DOES_NOT_EXIST()
    }
    return await this.repository.update({ email: oldEmail }, { email: newEmail })
  }

  async changePassword (data: UserDto) {
    if (!isValidEmail(data.email)) {
      return customError.INVALID_EMAIL()
    }

    if (await this.existByEmail(data.email)) {
      return customError.EMAIL_DOES_NOT_EXIST()
    }

    const user = await this.repository.get({ email: data.email })
    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword) {
      return customError.CURRENT_PASSWORD_ERR0R()
    }

    if (!comparePasswords(data.newPassword, data.confirmNewPassword)) {
      return customError.DIFFERENT_PASSWORDS()
    }

    if (changePasswordComparator(data.password, data.newPassword, data.confirmNewPassword)) {
      return customError.SAME_PASSWORDS_ERROR()
    }
    data.newPassword = await bcrypt.hash(data.newPassword, SALT_ROUNDS)
    return await this.repository.update({email: user.email}, {password: data.newPassword})
  }

  async getUserByToken ( {access_token}: {access_token: string} ) {
    const decode_token: {email: string} = await jwtDecode(access_token)
    const user_email = decode_token.email
    const user = await this.repository.get({email: user_email})
    return this.userProfileMapper.toDTO(user)
  }

  private async existByEmail (email: string) {
    const data = await this.repository.get({ email })
    return data == null
  }
}
