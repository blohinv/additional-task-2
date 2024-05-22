import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const start = async () => {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    name: 'DATA_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'task-2-queue',
    },
  });

  await app.startAllMicroservices();
  await app.listen(5000, () => {
    console.log('app is running on port 5000');
  });
};
start();
