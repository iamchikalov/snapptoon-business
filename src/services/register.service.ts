import { RegisterDto } from '../types/dtos';
import { Inject, Injectable } from '@nestjs/common'
import { RegisterMapper } from '../mappers'
import { CREATOR, SALT_ROUNDS } from '../utils'
import { EmailService } from './email.service'
import { isValidEmail } from '../utils'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
const bcrypt = require('bcrypt')
import {customError} from '../errors/custom.error'

@Injectable()
export class RegisterService {
  mapper = new RegisterMapper() // That's bullshit but works, count it as legacy
    constructor(
      @Inject(CREATOR) private readonly repository: BaseRepository<Creator>,
      private readonly emailService: EmailService
    ) { }

    async createAccount (doc: RegisterDto) {
      const verificationLink = 'link' // zamenit etu huinyu

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
      const created = await this.repository.create(this.mapper.toDomain(doc))
      await this.emailService.sendVerificationEmail(doc, verificationLink)
      return created
    }

    private async existByEmail(email: string) {
      const data = await this.repository.get({ email })
      return data == null;
    }
}
