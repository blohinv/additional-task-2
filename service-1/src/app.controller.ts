import { Controller, Get, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sign-data')
  signData() {
    return this.appService.signData();
  }

  @MessagePattern({ msg: 'data-sent-back' })
  verifyData(@Payload() dataSent: any): Promise<string> {
    return this.appService.verifyData(dataSent);
  }

  @MessagePattern({ msg: 'result' })
  getResult(@Payload() result: string): string {
    return result;
  }
}
