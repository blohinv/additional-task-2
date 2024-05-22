import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

export const start = async () => {
  const app = await NestFactory.createMicroservice(AppModule, {
    name: 'SIGN_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'task-2-queue',
    },
  });

  await app.listen();
};

start();
