import { Module } from '@nestjs/common';
import { AppController, LobbyController } from './app.controller';
import { AppService, LobbyService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import {
  LOBBY_QUEUE,
  LOBBY_SERVICE_CLIENT,
  USER_ACCOUNT_QUEUE,
  USER_ACCOUNT_SERVICE_CLIENT,
} from './constants';

dotenv.config();

console.log('RABBITMQ_URL', process.env.RABBITMQ_URL);
@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_ACCOUNT_SERVICE_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [`${process.env.RABBITMQ_URL}`],
          queue: USER_ACCOUNT_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: LOBBY_SERVICE_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [`${process.env.RABBITMQ_URL}`],
          queue: LOBBY_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, LobbyController],
  providers: [AppService, LobbyService],
})
export class AppModule {}
