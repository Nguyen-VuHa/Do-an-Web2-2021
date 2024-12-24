import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './core/entities/user.entity';
import { UserPhoto } from './core/entities/user-photo.entity';
import { Notification } from './core/entities/notification.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT), // Chuyển từ string sang number
  username: process.env.DATABASE_USERNAME,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: process.env.DATABASE_NAME,
  entities: [User, UserPhoto, Notification],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

export default AppDataSource;
