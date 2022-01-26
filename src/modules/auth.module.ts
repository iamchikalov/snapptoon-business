import { Module } from '@nestjs/common'
import { AuthService } from '../services'
import { LocalStrategy } from '../services/strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AUTH_SECRET_KEY, CREATOR, providerAggregation } from '../utils'
import { Creator, CreatorSchema } from '@snapptoon/backend-common/src/data/models/Creator'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthController } from '../controllers'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AUTH_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{name: Creator.name, schema: CreatorSchema}])
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
