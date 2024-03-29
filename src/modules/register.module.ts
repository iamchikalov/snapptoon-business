import { Module } from "@nestjs/common";
import { Creator, CreatorSchema } from '@snapptoon/backend-common/src/data/models/Creator'
import { RegisterController } from '../controllers';
import { RegisterService } from '../services';
import { CREATOR, dbAggregation, providerAggregation, VERIFICATION_TOKEN } from '../utils'
import { EmailModule } from './email.module'
import {
  VerificationToken,
  VerificationTokenSchema
} from '@snapptoon/backend-common/src/data/models/verificationToken.model'

@Module({
    imports: [
        EmailModule,
        dbAggregation(Creator, CreatorSchema),
        dbAggregation(VerificationToken, VerificationTokenSchema),
    ],
    controllers: [RegisterController],
    providers: [
      providerAggregation(VERIFICATION_TOKEN, VerificationToken),
      providerAggregation(CREATOR, Creator),
      RegisterService,
    ],
    exports: []
})

export class RegisterModule {}
