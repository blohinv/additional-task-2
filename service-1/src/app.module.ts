import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE, HOST } from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SERVICE_NAME } from './di-tokens.constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [HOST],
          queue: QUEUE,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
