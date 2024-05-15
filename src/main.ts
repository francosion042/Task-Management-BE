import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';

async function bootstrap() {
  // Create Nest.js application instance
  const app = await NestFactory.create(AppModule);

  // Apply global validation pipe to handle incoming request data validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Use My Custom Interceptor to remove password
  app.useGlobalInterceptors(new TransformInterceptor('password'));

  // Enable class-validator to use Nest.js container for dependency injection
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Start listening for incoming requests on port 3000
  await app.listen(3000);
}
bootstrap();
