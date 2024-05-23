import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { QUEUE, HOST } from 'config';
import { AppModule } from './app.module';
import { SERVICE_NAME } from './di-tokens.constant';

const start = async () => {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    name: SERVICE_NAME,
    transport: Transport.RMQ,
    options: {
      urls: [HOST],
      queue: QUEUE,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT, () => {
    console.log('app is running on port 5000');
  });
};
start();
