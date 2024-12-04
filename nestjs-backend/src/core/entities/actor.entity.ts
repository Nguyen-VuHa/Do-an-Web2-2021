import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn('increment')
  actor_id: number;

  @Column({ type: 'varchar', length: 100 })
  actor_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
