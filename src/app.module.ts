import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  USER_ACCOUNT_QUEUE,
  USER_ACCOUNT_SERVICE_RABBIT_MQ,
} from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_ACCOUNT_SERVICE_RABBIT_MQ,
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://guest:guest@localhost:5672'],
          urls: [
            // `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
            `${process.env.RABBITMQ_URL}`,
          ],
          queue: USER_ACCOUNT_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
