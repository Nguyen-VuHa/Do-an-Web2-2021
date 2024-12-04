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

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  category_id: number;

  @Column({ type: 'varchar', length: 100 })
  category_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @ManyToMany(() => Movie, (movie) => movie.categories)
  movies: Movie[];
}
