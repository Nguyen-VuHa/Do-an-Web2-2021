// src/seeders/run-screen-seeder.ts
import { NestFactory } from '@nestjs/core';
import { DataSeederService } from './data-seeder.service';
import { AppModule } from 'src/app.module';

async function runSeeder() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  try {
    const seederService = appContext.get(DataSeederService);
    await seederService.createScreenSeeder();
    console.log('Seeder completed successfully!');
  } catch (error) {
    console.error('Error running seeder:', error);
  } finally {
    await appContext.close();
    process.exit(0); // Thoát ứng dụng sau khi hoàn tất
  }
}

runSeeder();
