import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from './app.module';
const fs = require('fs');
async function bootstrap() {
  console.log('Env' + process.env.DB_CONNECT_STRING);

  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Electron local api')
    .setDescription('Xoontec')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('./swagger.json', JSON.stringify(document));
  SwaggerModule.setup('/api', app, document);
  await app.listen(3200);
}
bootstrap();
