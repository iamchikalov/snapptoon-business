import { Module } from '@nestjs/common'
import { VerificationToken, VerificationTokenSchema } from '@snapptoon/backend-common/src/data/models/verificationToken.model'
import { EmailService } from '../services'
import { VERIFICATION_TOKEN, providerAggregation, dbAggregation } from '../utils'

@Module({
  imports: [
    dbAggregation(VerificationToken, VerificationTokenSchema),
  ],
  providers: [
    EmailService,
    providerAggregation(VERIFICATION_TOKEN, VerificationToken),
  ],
  exports: [EmailService]
})

export class EmailModule {}
