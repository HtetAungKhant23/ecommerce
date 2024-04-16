import { DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('E-commerce API')
  .setDescription('E-commerce api documentation.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export default config;
