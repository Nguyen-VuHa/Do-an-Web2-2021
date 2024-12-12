import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity('movie_posters')
export class MoviePoster {
  @PrimaryGeneratedColumn('increment')
  movie_poster_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  poster_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @ManyToOne(() => Movie, (movie) => movie.posters, { cascade: true })
  @JoinColumn({ name: 'movie_id' }) // Tên cột khóa ngoại
  movie: Movie;
}
