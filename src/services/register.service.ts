import { RegisterDto, VerificationTokenDto } from '../types/dtos'
import { Inject, Injectable } from '@nestjs/common'
import { RegisterMapper } from '../mappers'
import { CREATOR, SALT_ROUNDS, VERIFICATION_TOKEN } from '../utils'
import { EmailService } from './email.service'
import { isValidEmail } from '../utils'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
const bcrypt = require('bcrypt')
import { customError } from '../errors/custom.error'
import { VerificationToken } from '@snapptoon/backend-common/src/data/models/verificationToken.model'

@Injectable()
export class RegisterService {
  registerMapper = new RegisterMapper() // That's bullshit but works, count it as legacy
    constructor(
      @Inject(VERIFICATION_TOKEN) private readonly tokenRepository: BaseRepository<VerificationToken>,
      @Inject(CREATOR) private readonly repository: BaseRepository<Creator>,
      private readonly emailService: EmailService
    ) { }

    async createAccount (doc: RegisterDto, verificationLink: string) {
      if (!isValidEmail(doc.email)) {
        return {
          error: customError.INVALID_EMAIL()
        }
      }

      const user = await this.existByEmail(doc.email)

      if (!user) {
        return {
          error: customError.EMAIL_EXIST()
        }
      }
      doc.password = await bcrypt.hash(doc.password, SALT_ROUNDS)
      const created = await this.repository.create(this.registerMapper.toDomain(doc))
      await this.emailService.sendVerificationEmail(created, verificationLink) // TODO: make assign id of user to id of token
      return created
    }

    async verifyAccount (token: VerificationTokenDto) {
      const verificationToken = await this.tokenRepository.get({value: token.value})
      console.log(verificationToken.value)
      console.log(token)
      if (token.value === verificationToken.value) {
        const user = await this.repository.get({creator: verificationToken.creator})
        console.log("Token from database: " + verificationToken.value)
        console.log("Token from request: " + token.value)
        console.log("Expected userId: " + user._id)
        console.log("Actual userId: " + verificationToken.creator)
        user.isVerified = true
      } else {
        console.log('Out of condition')
      }
    }

    private async existByEmail(email: string) {
      const data = await this.repository.get({ email })
      return data == null;
    }
}
