import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPhoto } from 'src/core/entities/user-photo.entity';
import { User } from 'src/core/entities/user.entity';
import { IObject } from 'src/core/types/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserPhoto)
    private readonly userPhotoRepository: Repository<UserPhoto>
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

  async createUserPhoto(data: UserPhoto): Promise<UserPhoto> {
    return await this.userPhotoRepository.save(data);
  }

  async getUserPhotos(user_id: string, condition: IObject<any>): Promise<UserPhoto[]> {
    return await this.userPhotoRepository.find({
      where: {
        user: {
          user_id: user_id,
        },
        ...condition,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }
}
