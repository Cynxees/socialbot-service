import { NestFactory } from '@nestjs/core';
import { PostServiceModule } from './post-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PostServiceModule);
  await app.listen(3002);
}
bootstrap();
