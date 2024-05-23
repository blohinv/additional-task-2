import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SERVICE_NAME } from './di-tokens.constant';
import { QUEUE, HOST } from 'config';

@Module({
  controllers: [AppController],
  providers: [AppService],
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
  exports: [AppService],
})
export class AppModule {}
