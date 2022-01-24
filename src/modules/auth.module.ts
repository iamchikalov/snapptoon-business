import { Module } from '@nestjs/common'
import { AuthService } from '../services'
import { LocalStrategy } from '../services/strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AUTH_SECRET_KEY, CREATOR, providerAggregation } from '../utils'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AUTH_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    providerAggregation(CREATOR, Creator),
    AuthService,
    LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule { }
