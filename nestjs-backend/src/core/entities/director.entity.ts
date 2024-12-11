import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity('directors')
export class Director {
  @PrimaryGeneratedColumn('increment')
  director_id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  director_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @OneToMany(() => Movie, (movie) => movie.director, { onDelete: 'CASCADE' })
  movie: Movie[];
}
