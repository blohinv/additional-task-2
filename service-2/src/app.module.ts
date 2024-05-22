import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ClientsModule.register([
      {
        name: 'SIGN_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'task-2-queue',
        },
      },
    ]),
  ],
  exports: [AppService],
})
export class AppModule {}
