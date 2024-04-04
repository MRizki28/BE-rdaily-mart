import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
