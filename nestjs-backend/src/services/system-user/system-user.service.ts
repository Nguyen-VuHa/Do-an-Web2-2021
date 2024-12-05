import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemUser } from 'src/core/entities/system-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SystemUserService {
  constructor(
    @InjectRepository(SystemUser)
    private readonly systemUserRepository: Repository<SystemUser>
  ) {}

  async createUserSystem(userData: SystemUser): Promise<SystemUser> {
    return await this.systemUserRepository.save(userData);
  }

  async getUserSystemByEmail(email: string): Promise<SystemUser> {
    return await this.systemUserRepository.findOne({
      where: {
        email: email,
        deleted_at: null,
      },
    });
  }
}
