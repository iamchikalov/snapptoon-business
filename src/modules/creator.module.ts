import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Creator, CreatorSchema } from '@snapptoon/backend-common/src/data/models/Creator'
import { CreatorController } from '../controllers';
import { CreatorService } from '../services';
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Creator.name, schema: CreatorSchema }])
    ],
    controllers: [CreatorController],
    providers: [
      CreatorService,
        {
            provide: CreatorService,
            useFactory: async (
                repository: BaseRepository<Creator>
            ) => {
                return new CreatorService(repository)
            },
            inject: []
        }
    ],
    exports: []
})

export class CreatorModule {}
