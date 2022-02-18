import { Module } from '@nestjs/common'
import { CREATOR, dbAggregation, providerAggregation } from '../utils'
import { Creator, CreatorSchema } from '@snapptoon/backend-common/src/data/models/Creator'
import { UserService } from '../services'
import { UserController } from '../controllers'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule,
    dbAggregation(Creator, CreatorSchema)
  ],
  providers: [
    providerAggregation(CREATOR, Creator),
    UserService
  ],
  controllers: [UserController]
})

export class UserModule {}
