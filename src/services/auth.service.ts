import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { comparePasswords, CREATOR, mailer, makeId, SALT_ROUNDS, VERIFICATION_TOKEN } from '../utils'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
import { JwtService } from '@nestjs/jwt'
import { authDto, SetPasswordDto } from '../types/dtos'
import { VerificationToken } from '@snapptoon/backend-common/src/data/models/verificationToken.model'
const crypto = require('crypto')
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
  constructor (
    @Inject(CREATOR) private readonly repository: BaseRepository<Creator>,
    @Inject(VERIFICATION_TOKEN) private readonly tokenRepository: BaseRepository<VerificationToken>,
    private readonly jwtService: JwtService
  ) { }

  async validateUser (email: string, password: string) {
    const user = await this.repository.get({ email })
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (isValidPassword && user) {
      return user
    }
    return null
  }

  async login (data: authDto) {
    const user = await this.validateUser(data.email, data.password)
    if (user == null) {
      throw new HttpException('INVALID PASSWORD', HttpStatus.FORBIDDEN)
    }

    if (user.isVerified == false) {
      throw new HttpException('USER HAS UNVERIFIED ACCOUNT', HttpStatus.FORBIDDEN)
    }

    const accessToken = { _id: user._id, email: user.email, type: user.type }
    const refreshToken = { email: user.email, name: user.name }

    return {
      access_token: this.jwtService.sign(accessToken),
      refresh_token: this.jwtService.sign(refreshToken)
    }
  }

  async sendRecoveryEmail (email: string, verifyUrl) {
    const user = await this.repository.get({ email })
    if (!user) {
      throw new HttpException('EMAIL DOES NOT EXIST', HttpStatus.NOT_FOUND)
    }
    const tokenData = {
      _id: makeId(),
      creatorId: user._id,
      value: crypto.randomBytes(16).toString('hex')
    }
    const token = await this.tokenRepository.create(tokenData)
    try {
      const subject = 'Account password reset'
      const to = user.email
      const from = 'test.snapptoon@gmail.com'
      const link = verifyUrl + token.value
      const html = `<p>Hi ${user.email}<p><br><p>Please click on the following <a href="${link}">link</a> reset password.</p>
             <br><p>If you did not request this, please ignore this email.</p>`

      await mailer(from, to, subject, link, html)
      console.log('Email has been sent')
    } catch (e) {
      throw new Error(`Problem with nodeMailer service: ${e.message}`)
    }
  }

  async resetPassword (recoveryDto: SetPasswordDto) {
    const token = await this.tokenRepository.get({ value: recoveryDto.tokenValue })
    if (!token) {
      throw new HttpException('TOKEN DOES NOT EXIST', HttpStatus.NOT_FOUND)
    }
    if (!comparePasswords(recoveryDto.newPassword, recoveryDto.confirmPassword)) {
      throw new HttpException('DIFFERENT PASSWORDS', HttpStatus.BAD_REQUEST)
    }
    try {
      const user = await this.repository.get({ _id: token.creatorId })
      recoveryDto.newPassword = await bcrypt.hash(recoveryDto.newPassword, SALT_ROUNDS)
      await this.repository.update({email: user.email}, {password: recoveryDto.newPassword})
      await this.tokenRepository.delete({value: recoveryDto.tokenValue})
    } catch (e) {
      throw new HttpException(
        `INTERNAL_SERVER_ERROR: ${e.message} -- Cannot find comparable user._id with token.creatorId`,
        HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
  }
}
