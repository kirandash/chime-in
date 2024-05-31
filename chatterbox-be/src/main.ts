import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // this helps to log the request and response details
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
