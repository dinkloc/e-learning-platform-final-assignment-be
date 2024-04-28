import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from './common/services/config.service';
import { DatabaseModule } from './database/database.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Final Assignment E-Learning Platform BE')
    .setDescription('API docs Final Assignment E-Learning Platform BE')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('BE')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const databaseModule: DatabaseModule = new DatabaseModule();
  await databaseModule.runMigrations(configService);

  await app.listen(5000);
}

bootstrap();
