import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MoviePoster } from './movie-poster.entity';
import { Actor } from './actor.entity';
import { Category } from './category.entity';
import { Director } from './director.entity';
import { Showtime } from './showtime.entity';
import { Booking } from './booking.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  movie_id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'varchar', length: 30 })
  trailer_id: string; // id youtube trailer

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @OneToMany(() => MoviePoster, (poster) => poster.movie)
  posters: MoviePoster[];

  @ManyToOne(() => Director, (director) => director.movie, { nullable: true })
  @JoinColumn({ name: 'director_id' }) // Tên cột khóa ngoại
  director: Director;

  @ManyToMany(() => Actor, (actor) => actor.movies, { nullable: true })
  @JoinTable({
    name: 'movie_actors',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'movie_id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'actor_id',
    },
  }) // Tạo bảng trung gian tự động
  actors: Actor[];

  @ManyToMany(() => Category, (category) => category.movies, { nullable: true })
  @JoinTable({
    name: 'movie_categories',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'movie_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'category_id',
    },
  }) // Tạo bảng trung gian tự động
  categories: Category[];

  @OneToMany(() => Showtime, (showtime) => showtime.movie, { cascade: true })
  showtimes: Showtime[];

  @OneToMany(() => Booking, (booking) => booking.movie)
  booking: Booking[];
}
