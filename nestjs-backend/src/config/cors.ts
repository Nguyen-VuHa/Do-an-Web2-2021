import { ConfigService } from '@nestjs/config';

export const getCorsConfig = (configService: ConfigService) => {
  const origin = configService.get<string>('CORS_ORIGIN')?.split(',') || '*';
  const methods = configService.get<string>('CORS_METHODS') || 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const credentials = configService.get<boolean>('CORS_CREDENTIALS') || false;

  return {
    origin,
    methods,
    credentials,
  };
};
