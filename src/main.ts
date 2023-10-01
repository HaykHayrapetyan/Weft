import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GenericExceptionFilter } from './filters/generic-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ApiConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GenericExceptionFilter(app.get(HttpAdapterHost)), new HttpExceptionFilter())
  const config = app.get(ApiConfigService);

  await app.listen(config.port);
}
bootstrap();
