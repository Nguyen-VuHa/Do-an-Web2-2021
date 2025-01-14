import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Movie } from './movie.entity';
import { Screen } from './screen.entity';

@Entity('showtimes')
export class Showtime {
  @PrimaryColumn({ type: 'varchar' }) // Định nghĩa cột là khóa chính, kiểu chuỗi
  showtime_id: string;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column()
  unit_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @ManyToOne(() => Screen, (cinema) => cinema.showtimes)
  @JoinColumn({ name: 'screen_id' }) // Liên kết với primary key của Cinema
  screen: Screen;

  @ManyToOne(() => Movie, (movie) => movie.showtimes)
  @JoinColumn({ name: 'movie_id' }) // Liên kết với primary key của Cinema
  movie: Movie;

  @OneToMany(() => Booking, (booking) => booking.showtime)
  booking: Booking[];
}
