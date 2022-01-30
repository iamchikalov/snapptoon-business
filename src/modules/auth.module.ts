import { Module } from '@nestjs/common'
import { AuthService } from '../services'
import { LocalStrategy } from '../services/strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AUTH_SECRET_KEY, CREATOR, dbAggregation, providerAggregation } from '../utils'
import { Creator, CreatorSchema } from '@snapptoon/backend-common/src/data/models/Creator'
import { AuthController } from '../controllers'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AUTH_SECRET_KEY,
      signOptions: { expiresIn: '2d' },
    }),
    dbAggregation(Creator, CreatorSchema),
  ],
  providers: [
    providerAggregation(CREATOR, Creator),
    AuthService,
    LocalStrategy,
  ],
  exports: [AuthService],
  controllers:[AuthController]
})
export class AuthModule { }
