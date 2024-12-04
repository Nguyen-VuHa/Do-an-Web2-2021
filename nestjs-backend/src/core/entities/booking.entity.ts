import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Showtime } from './showtime.entity';
import { Seat } from './seat.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Showtime, (showtime) => showtime.bookings)
  showtime: Showtime;

  @ManyToOne(() => Seat, { eager: true })
  seat: Seat;

  @Column({ type: 'enum', enum: ['PENDING', 'CONFIRMED', 'CANCELLED'], default: 'PENDING' })
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
