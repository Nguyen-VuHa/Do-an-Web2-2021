import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(userData: User): Promise<User> {
    return await this.userRepository.save(userData);
  }

  async getUserByID(userID: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        user_id: userID,
        deleted_at: null,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
        deleted_at: null,
      },
    });
  }

  async updateUser(userID: string, userData: User): Promise<User> {
    // Tìm user theo ID
    const user = await this.userRepository.findOne({ where: { user_id: userID } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userID} not found`);
    }

    // Cập nhật thông tin user
    Object.assign(user, userData);
    return await this.userRepository.save(user);
  }
}
