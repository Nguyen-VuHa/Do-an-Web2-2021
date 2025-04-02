import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingHistory } from './booking-history.entity';
import { User } from './user.entity';
import { Movie } from './movie.entity';
import { Showtime } from './showtime.entity';
import { Screen } from './screen.entity';
import { PaymentType } from './payment.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  booking_id: number;

  @Column()
  total_amount: number;

  @Column()
  unit_price: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @OneToMany(() => BookingHistory, (history) => history.booking)
  history: BookingHistory[];

  @ManyToOne(() => User, (user) => user.booking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.booking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Showtime, (showtime) => showtime.booking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'showtime_id' })
  showtime: Showtime;

  @ManyToOne(() => Screen, (screen) => screen.booking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'screen_id' })
  screen: Screen;

  @OneToOne(() => PaymentType, (paymentType) => paymentType.booking)
  @JoinColumn({ name: 'payment_type_id' })
  payment_type: PaymentType;
}
