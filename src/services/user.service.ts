import {
  changePasswordComparator,
  comparePasswords,
  CREATOR,
  EXTERNAL_BEARER_TOKEN,
  isValidEmail,
  SALT_ROUNDS
} from '../utils'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
import { UserDto } from '../types/dtos'
import { UserProfileMapper } from '../mappers/user-profile.mapper'
import jwtDecode from 'jwt-decode'
import { TokenDto } from '../types/dtos/token.dto'
import { EmailService } from "./email.service";
import { QueryDto } from '../types/dtos/query.dto'
import { urlComposer } from '../utils/external-request-composer'
import axios from 'axios'
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
  userProfileMapper = new UserProfileMapper()
  constructor (
    @Inject(CREATOR) private readonly repository: BaseRepository<Creator>,
    private readonly emailService: EmailService
  ) {}


  private header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': EXTERNAL_BEARER_TOKEN
  }

  async changeEmail (
    oldEmail: string,
    newEmail: string,
    verificationLink: string
  ) {

    if (!isValidEmail(newEmail)) {
      throw new HttpException('INVALID EMAIL', HttpStatus.BAD_REQUEST)
    }

    if (await this.existByEmail(oldEmail)) {
      throw new HttpException('EMAIL DOES NOT EXIST', HttpStatus.NOT_FOUND)
    }

    if (!await this.existByEmail(newEmail)) {
      throw new HttpException('THIS EMAIL ALREADY IN USE', HttpStatus.FORBIDDEN)
    }
    await this.repository.update({ email: oldEmail }, { email: newEmail })
    const newUser = await this.repository.get({email: newEmail})

    await this.repository.update({ email: newUser.email }, { isVerified: false })
    await this.emailService.sendVerificationEmail(newUser, verificationLink)
    return newUser
  }

  async changePassword (data: UserDto) {
    if (!isValidEmail(data.email)) {
      throw new HttpException('INVALID EMAIL', HttpStatus.BAD_REQUEST)
    }

    if (await this.existByEmail(data.email)) {
      throw new HttpException('EMAIL DOES NOT EXIST', HttpStatus.NOT_FOUND)
    }

    const user = await this.repository.get({ email: data.email })
    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword) {
      throw new HttpException('CURRENT PASSWORD IS INCORRECT', HttpStatus.BAD_REQUEST)
    }

    if (!comparePasswords(data.newPassword, data.confirmNewPassword)) {
      throw new HttpException('PASSWORDS ARE NOT SAME', HttpStatus.BAD_REQUEST)
    }

    if (changePasswordComparator(data.password, data.newPassword, data.confirmNewPassword)) {
      throw new HttpException('CANNOT CHANGE SET NEW PASSWORD AS OLD PASSWORD', HttpStatus.FORBIDDEN)
    }

    data.newPassword = await bcrypt.hash(data.newPassword, SALT_ROUNDS)
    return await this.repository.update({email: user.email}, {password: data.newPassword})
  }

  async getUserByToken (token: string) {
    try {
      const object: TokenDto = await jwtDecode(token)
      const user = await this.repository.get({_id: object._id})
      return this.userProfileMapper.toDTO(user)
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  async changeUserData (file, userDto: UserDto) {
    try {
      const token = userDto.access_token.split(' ')
      const object: TokenDto = await jwtDecode(token[1])
      const user = await this.repository.get({_id: object._id})
      return await this.repository.updateRaw({ _id: user._id }, userDto, userDto)
    } catch (e) {
      throw new HttpException('TOKEN WAS DAMAGED', HttpStatus.I_AM_A_TEAPOT)
    }
  }

  async getExternalAsset (query: QueryDto, token: string) {
    if (query.sort == 'uid' || query.sort == '-uid'){
      throw new HttpException('CANNOT SORT BY OBJECT ID', HttpStatus.BAD_REQUEST)
    }
    let validToken: TokenDto
    try {
      validToken = await jwtDecode(token)
      const url = urlComposer(validToken._id, query)
      const response = await axios.get(url, {headers: this.header})
      return response.data
    } catch (e) {
      throw new HttpException('SOMETHING WENT WRONG', HttpStatus.I_AM_A_TEAPOT)
    }
  }

  private async existByEmail (email: string) {
    const data = await this.repository.get({ email })
    return data == null
  }
}
