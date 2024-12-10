import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/core/entities/actor.entity';
import { IObject } from 'src/core/types/common';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>
  ) {}

  async getAllActors(): Promise<Actor[]> {
    return await this.actorRepository.find({
      where: {
        deleted_at: null,
      },
    });
  }

  async getActorByWhere(conditions: IObject<any>): Promise<Actor> {
    return await this.actorRepository.findOne({
      where: conditions,
      withDeleted: true,
    });
  }

  async createActor(actorData: Actor): Promise<Actor> {
    return await this.actorRepository.save(actorData);
  }

  async updateActor(actor_id: number, actorData: Actor): Promise<any> {
    return await this.actorRepository.update(actor_id, actorData);
  }

  async softDeleteActor(actor_id: number): Promise<any> {
    const category = await this.actorRepository.findOne({
      where: { actor_id, deleted_at: IsNull() },
    });
    if (!category) {
      throw new Error(`Category with ID ${actor_id} not found`);
    }
    return await this.actorRepository.softRemove(category);
  }

  async unSoftDeleteActor(actor_id: number): Promise<any> {
    return await this.actorRepository.update(actor_id, {
      deleted_at: null, // Khôi phục lại bản ghi
    });
  }
}
