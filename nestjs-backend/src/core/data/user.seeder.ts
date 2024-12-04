import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async seed() {
    const users: User[] = [];

    // Tạo 200 người dùng
    for (let i = 0; i < 200; i++) {
      const user = new User();
      user.name = faker.name.fullName();
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      user.created_at = faker.date.past();
      user.updated_at = faker.date.recent();

      // Lưu user vào mảng
      users.push(user);
    }

    // Lưu tất cả user và booking vào database
    await this.userRepository.save(users);
  }
}
