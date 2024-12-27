import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Screen } from 'src/core/entities/screen.entity';
import { IObject } from 'src/core/types/common';
import { Repository } from 'typeorm';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>
  ) {}

  async getPaginationScreenByCondition(conditions: IObject<any>): Promise<[Screen[], number]> {
    return await this.screenRepository.findAndCount(conditions);
  }

  async getCinemaByIDWithDeleted(id: number): Promise<Screen> {
    return await this.screenRepository.findOne({
      where: {
        screen_id: id,
      },
      withDeleted: true,
    });
  }

  async getCinemaByConditionWithDeleted(conditions: IObject<any>): Promise<Screen> {
    return await this.screenRepository.findOne({
      ...conditions,
      withDeleted: true,
    });
  }

  async createScreen(screenData: Screen): Promise<Screen> {
    return await this.screenRepository.save(screenData);
  }

  async updateScreen(screenData: Screen): Promise<Screen> {
    return await this.screenRepository.save(screenData);
  }

  async softDeleteScreen(screen_id: number): Promise<any> {
    const screen = await this.screenRepository.findOne({
      where: { screen_id },
    });

    if (!screen) {
      throw new NotFoundException('Screen not found');
    }

    return await this.screenRepository.softRemove(screen);
  }

  async unSoftDeleteScreen(screen_id: number): Promise<any> {
    const screen = await this.screenRepository.findOne({
      where: { screen_id },
      withDeleted: true,
    });

    if (!screen) {
      throw new NotFoundException('Screen not found');
    }

    return await this.screenRepository.update(screen_id, {
      deleted_at: null, // Khôi phục lại bản ghi
    });
  }
}
