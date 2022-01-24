import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VerificationToken, VerificationTokenSchema } from '@snapptoon/backend-common/src/data/models/verificationToken.model'
import { EmailService } from '../services'
import { VERIFICATION_TOKEN, providerAggregation } from '../utils'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VerificationToken.name, schema: VerificationTokenSchema }])
  ],
  providers: [
    EmailService,
    providerAggregation(VERIFICATION_TOKEN, VerificationToken),
  ],
  exports: [EmailService]
})

export class EmailModule {}
