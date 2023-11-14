import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CategoryModel } from './docs/model/category.model';
import { ProductModel } from './docs/model/product.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
    }),
  );

  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('Personare')
    .setDescription('Personare API.')
    .setVersion('1.0')
    .addTag('personare')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [CategoryModel, ProductModel],
  });
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(
    +configService.getOrThrow('PORT'),
    configService.getOrThrow('HOST'),
  );
}
bootstrap();
