import { NestFactory } from '@nestjs/core';
import { SnapptoonBusinessModule } from './modules';
import { ConfigModule } from "./config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SnapptoonBusinessModule);
  const options = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, options)
  app.enableCors()
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(ConfigModule.SERVER_PORT, ConfigModule.HOST);
  console.log(`Server listening: http://${ConfigModule.HOST}:${ConfigModule.SERVER_PORT}`)
}
bootstrap();
