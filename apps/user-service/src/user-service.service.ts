import { Injectable } from '@nestjs/common';
import { AuthService } from '@app/auth'; 

@Injectable()
export class UserServiceService {

  constructor(
    private readonly authService: AuthService
  ){

  }

  getHello(): string {
    return this.authService.test()
  }
}
