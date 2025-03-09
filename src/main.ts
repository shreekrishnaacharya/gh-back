import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*', // Allow all headers
    credentials: false, // Set to true if cookies are required (not typical for "allow all")
  });
  const config = new DocumentBuilder()
    .setTitle('Globally Hub - Task Managament')
    .setDescription('This is a task management assignment')
    .setVersion('1.0')
    .build();

  const options = {
    swaggerOptions: {
      persistAuthorization: true,
      exports: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
