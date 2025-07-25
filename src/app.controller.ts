import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService, LobbyService } from './app.service';
import {
  LOBBY,
  LOBBY_SERVICE_CLIENT,
  USER_ACCOUNT,
  USER_ACCOUNT_SERVICE_CLIENT,
} from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('user-account')
export class AppController {
  constructor(
    private readonly appService: AppService,

    @Inject(USER_ACCOUNT_SERVICE_CLIENT)
    private readonly userAccountService: ClientProxy,
  ) {}

  @Get()
  async getUserAccount(): Promise<any> {
    return firstValueFrom(
      this.userAccountService.send(USER_ACCOUNT.GET_USER_ACCOUNT, {
        name: 'John Doe',
      }),
    );
  }
}

@Controller('lobby')
export class LobbyController {
  constructor(
    private readonly lobbyService: LobbyService,

    @Inject(LOBBY_SERVICE_CLIENT)
    private readonly lobbyServiceClient: ClientProxy,
  ) {}

  @Post('create')
  async createLobby(@Body() body: any): Promise<any> {
    return firstValueFrom(
      this.lobbyServiceClient.send(LOBBY.CREATE_LOBBY, body),
    );
  }
}
