import { Inject } from '@nestjs/common'
import { VERIFICATION_TOKEN } from '../utils'
import { RegisterDto } from '../types/dtos'
import { mailer } from '../utils'
import { VerificationToken } from '@snapptoon/backend-common/src/data/models/verificationToken.model'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { VerificationTokenMapper } from '../mappers'

export class EmailService {
  tokenMapper = new VerificationTokenMapper()
  constructor (
    @Inject(VERIFICATION_TOKEN) private repository: BaseRepository<VerificationToken>
  ) {}

  public async sendVerificationEmail(
    creator: RegisterDto,
    verifyUrl: string
  ): Promise<void> {
    try {
      console.log(creator._id)
      const token = await this.repository.create(this.tokenMapper.toDomain(creator))
      console.log(token.value)
      console.log(token.creator)

      const subject = 'Account Verification Token'
      const to = creator.email
      const from = process.env.FROM_EMAIL
      const link = verifyUrl + token.value
      const html = `<p>Hi ${creator.email}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p>
             <br><p>If you did not request this, please ignore this email.</p>`

      await mailer(from, to, subject, link, html)
    } catch (err) {
      throw new Error(`Problem with nodeMailer service: ${err.message}`)
    }
  }
}
