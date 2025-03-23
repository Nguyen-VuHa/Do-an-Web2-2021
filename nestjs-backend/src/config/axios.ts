import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule, // Đảm bảo ConfigModule được import để sử dụng ConfigService
    HttpModule.registerAsync({
      imports: [ConfigModule], // Nhập ConfigModule để sử dụng ConfigService
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('API_BASE_URL'), // Lấy giá trị từ biến môi trường
        timeout: 10000, // Timeout, mặc định 10000ms
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      inject: [ConfigService], // Tiêm ConfigService
    }),
  ],
  providers: [
    {
      provide: 'AXIOS_CRAWLER',
      useFactory: async (configService: ConfigService) => {
        const axios = await import('axios');
        return axios.default.create({
          baseURL: configService.get<string>('API_CRAWLER_URL'),
          headers: { 'Content-Type': 'application/json' },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [HttpModule, 'AXIOS_CRAWLER'], // Export HttpModule để các module khác sử dụng
})
export class GlobalHttpModule {}
