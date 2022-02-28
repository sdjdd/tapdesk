import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExcludeNullInterceptor } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalInterceptors(
    new ExcludeNullInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  await app.listen(3000);
}
bootstrap();
