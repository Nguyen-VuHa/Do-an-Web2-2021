import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder.service';
import { AppModule } from 'src/app.module';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const seederService = app.get(SeederService);
  await seederService.run(); // Chạy seeder khi khởi động
  console.log('Seeder completed!');
  await app.close(); // Đóng app sau khi hoàn thành
}

seed();
