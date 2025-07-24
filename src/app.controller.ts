import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { USER_ACCOUNT, USER_ACCOUNT_SERVICE_RABBIT_MQ } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    @Inject(USER_ACCOUNT_SERVICE_RABBIT_MQ)
    private readonly userAccountService: ClientProxy,
  ) {}

  @Get('user-account')
  async getUserAccount(): Promise<string> {
    return firstValueFrom(
      this.userAccountService.send(USER_ACCOUNT.GET_USER_ACCOUNT, {
        name: 'John Doe',
      }),
    );
  }
}
