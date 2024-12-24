import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import ENTITIES from 'src/core/entities/entities';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: ENTITIES, // Cập nhật entities của bạn tại đây
  synchronize: false,
  logging: true,
  extra: {
    options: '-c timezone=UTC', // Thiết lập múi giờ ở cấp độ kết nối
  },
});
