import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SERVICE_NAME } from './di-tokens.constant';
import { QUEUE, HOST } from 'config';

export const start = async () => {
  const app = await NestFactory.createMicroservice(AppModule, {
    name: SERVICE_NAME,
    transport: Transport.RMQ,
    options: {
      urls: [HOST],
      queue: QUEUE,
    },
  });

  await app.listen();
};

start();
