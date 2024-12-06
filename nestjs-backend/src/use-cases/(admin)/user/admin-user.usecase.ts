import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminUserUseCases {
  async getUserInfo(): Promise<string> {
    return 'xu ly string xong roi';
  }
}
