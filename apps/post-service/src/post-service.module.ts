import { Module } from '@nestjs/common';
import { PostServiceController } from './post-service.controller';
import { PostServiceService } from './post-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [PostServiceController],
  providers: [PostServiceService],
})
export class PostServiceModule {}
