import { Module } from '@nestjs/common'
import { AuthService } from '../services'
import { LocalStrategy } from '../services/strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AUTH_SECRET_KEY, CREATOR, dbAggregation, providerAggregation, VERIFICATION_TOKEN } from '../utils'
import { Creator, CreatorSchema } from '@snapptoon/backend-common/src/data/models/Creator'
import { AuthController } from '../controllers'
import {
  VerificationToken,
  VerificationTokenSchema
} from '@snapptoon/backend-common/src/data/models/verificationToken.model'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AUTH_SECRET_KEY,
      signOptions: { expiresIn: '2d' },
    }),
    dbAggregation(Creator, CreatorSchema),
    dbAggregation(VerificationToken, VerificationTokenSchema)
  ],
  providers: [
    providerAggregation(CREATOR, Creator),
    providerAggregation(VERIFICATION_TOKEN, VerificationToken),
    AuthService,
    LocalStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
