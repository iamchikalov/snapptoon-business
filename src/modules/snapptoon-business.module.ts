import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { CreatorModule } from "./creator.module";
import { ConfigModule } from "../config";
import { RegisterModule } from "./register.module";
import { AuthModule } from './auth.module'

@Module({
    imports: [
        MongooseModule.forRoot(ConfigModule.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }),
        CreatorModule,
        RegisterModule,
        AuthModule,
    ],
    controllers: [],
    providers: []
})

export class SnapptoonBusinessModule {}

