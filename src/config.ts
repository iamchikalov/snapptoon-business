import { Module } from "@nestjs/common";

@Module({})
export class ConfigModule {
    static HOST = process.env.HOST || '127.0.0.1'
    static SERVER_PORT = process.env.PORT || 3000;
    static CORS_WHITELIST = process.env.CORS_WHITELIST || '*';
    static MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/snaptoon'
}
