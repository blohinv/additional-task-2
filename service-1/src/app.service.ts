import { Inject, Injectable, Res } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import * as crypto from 'crypto';
import { Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('APP_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  signData() {
    const data = this.generateDataArray();
    const dataSent = JSON.stringify(Array.from(data));
    const result = this.rabbitClient.send({ msg: 'data-sent' }, dataSent);
    return result;
  }

  generateDataArray(): Buffer {
    const buffer = Buffer.from(this.generateRandomHex(25600));
    return buffer;
  }

  generateRandomHex(size: number): any {
    const result = [];
    [...Array(size)].map(() =>
      result.push(Math.floor(Math.random() * 16).toString(16)),
    );

    return result;
  }

  async verifyData(data: Buffer): Promise<string> {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'sect233k1',
    });
    const signature = Buffer.from(data);
    const verify = crypto.createVerify('SHA256');
    verify.update(signature);
    verify.end();
    const result = verify.verify(publicKey, signature);
    return JSON.stringify(result);
  }
}
