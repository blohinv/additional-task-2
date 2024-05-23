import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as crypto from 'crypto';
import { Buffer } from 'buffer';
import { Observable } from 'rxjs';
import { SERVICE_NAME } from './di-tokens.constant';

@Injectable()
export class AppService {
  constructor(
    @Inject(SERVICE_NAME) private readonly rabbitClient: ClientProxy,
  ) {}

  sendDataBack(data: any): Observable<string> {
    return this.rabbitClient.send(
      { msg: 'data-sent-back' },
      JSON.stringify(this.signData(data)),
    );
  }

  handleDataSent(data: Buffer): string {
    return JSON.parse(String.fromCharCode.apply(null, Buffer.from(data)));
  }

  signData(data: Buffer): Buffer {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'sect233k1',
    });

    const sign = crypto.createSign('SHA256');
    sign.update(data);
    sign.end();
    return sign.sign(privateKey);
  }
}
