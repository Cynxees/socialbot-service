import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  test() : string{
    return 'auth test';
  }


}
