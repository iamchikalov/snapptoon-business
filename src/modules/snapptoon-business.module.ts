import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "../config";
import { RegisterModule } from "./register.module";
import { AuthModule } from './auth.module'
import { UserModule } from './user.module'
import { StaticDataModule } from './static-data.module'

@Module({
    imports: [
        MongooseModule.forRoot(ConfigModule.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }),
        RegisterModule,
        AuthModule,
        UserModule,
        StaticDataModule
    ],
    controllers: [],
    providers: []
})

export class SnapptoonBusinessModule {}

