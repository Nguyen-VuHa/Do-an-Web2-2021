import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, NotifyStatus } from 'src/core/entities/notification.entity';
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

  async countNotifyUnRead(user_id: string): Promise<number> {
    return await this.notifyRepository.count({
      where: {
        user: { user_id: user_id },
        notify_status: NotifyStatus.UNREAD,
      },
    });
  }
  async createNotify(notifyData: Notification): Promise<Notification> {
    return await this.notifyRepository.save(notifyData);
  }

  async updateNotify(notifyData: Notification): Promise<Notification> {
    return await this.notifyRepository.save(notifyData);
  }

  async updateStatusNotifyToRead(user_id: string): Promise<any> {
    return await this.notifyRepository.update(
      { user: { user_id: user_id }, notify_status: NotifyStatus.UNREAD }, // Điều kiện tìm kiếm thông báo chưa đọc của user
      { notify_status: NotifyStatus.READ } // Cập nhật trạng thái thành "read"
    );
  }
}
