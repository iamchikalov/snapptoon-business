import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { Creator, CreatorSchema } from '@snapptoon/backend-common/src/data/models/Creator'
import { RegisterController } from '../controllers';
import { RegisterService } from '../services';
import { CREATOR, providerAggregation } from '../utils'
import { EmailModule } from './email.module'

@Module({
    imports: [
        EmailModule,
        MongooseModule.forFeature([{ name: Creator.name, schema: CreatorSchema }]),
    ],
    controllers: [RegisterController],
    providers: [
      providerAggregation(CREATOR, Creator),
      RegisterService,
    ],
    exports: []
})

export class RegisterModule {}
