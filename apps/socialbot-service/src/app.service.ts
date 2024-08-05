import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('CLIENT_1') private readonly client1 : ClientProxy,
    @Inject('CLIENT_2') private readonly client2 : ClientProxy
  ){

  }
  getHello(): string {
    return 'SocialBot Service';
  }
}
