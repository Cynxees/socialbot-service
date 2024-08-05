import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ClientsModule.register({
      clients: [
        {
          name: 'CLIENT_1',
          transport: Transport.TCP,
        },
        {
          name: 'CLIENT_2',
          transport: Transport.TCP,
        }
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
