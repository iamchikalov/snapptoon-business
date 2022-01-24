import { NestFactory } from '@nestjs/core';
import { SnapptoonBusinessModule } from './modules';
import { ConfigModule } from "./config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SnapptoonBusinessModule);
  const options = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)
  await app.listen(ConfigModule.SERVER_PORT, ConfigModule.HOST);
  console.log(`Server listening: ${ConfigModule.HOST}:${ConfigModule.SERVER_PORT}`)
}
bootstrap();
