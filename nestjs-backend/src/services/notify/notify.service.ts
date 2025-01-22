import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/core/entities/notification.entity';
import { IObject } from 'src/core/types/common';
import { Repository } from 'typeorm';

@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(Notification)
    private notifyRepository: Repository<Notification>
  ) {}

  async getPaginationNotifyByCondition(
    conditions: IObject<any>
  ): Promise<[Notification[], number]> {
    return await this.notifyRepository.findAndCount(conditions);
  }

  async createNotify(notifyData: Notification): Promise<Notification> {
    return await this.notifyRepository.save(notifyData);
  }

  async updateNotify(notifyData: Notification): Promise<Notification> {
    return await this.notifyRepository.save(notifyData);
  }
}
