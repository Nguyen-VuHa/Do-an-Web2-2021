import { Injectable } from '@nestjs/common';
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
}
