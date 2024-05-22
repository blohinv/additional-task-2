import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ msg: 'data-sent' })
  sendDataBack(@Payload() dataSent: Buffer): Observable<string> {
    const data = this.appService.handleDataSent(dataSent);
    return this.appService.sendDataBack(Buffer.from(data));
  }
}
