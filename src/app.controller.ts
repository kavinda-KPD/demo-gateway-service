import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { USER_ACCOUNT, USER_ACCOUNT_SERVICE_CLIENT } from './constants';
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
