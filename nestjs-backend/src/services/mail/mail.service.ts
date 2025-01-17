import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { IEmailVerifyRequest } from 'src/core/types/email.type';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async sendVerifyMail(data: IEmailVerifyRequest): Promise<void> {
    try {
      const tokenService = this.configService.get<string>('SERVICE_TOKEN');
      const path = `/api/mail/active-user?token=${tokenService}`;

      const response = await lastValueFrom(this.httpService.post(path, data));

      console.log(response.data);
    } catch (error) {
      console.log(error.toString());
    }
  }
}
