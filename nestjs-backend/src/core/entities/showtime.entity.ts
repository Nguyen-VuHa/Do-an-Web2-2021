import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Cinema } from './cinema.entity';
import { Booking } from './booking.entity';

@Entity('showtimes')
export class Showtime {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Cinema, (cinema) => cinema.showtimes)
  cinema: Cinema;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Booking, (booking) => booking.showtime)
  bookings: Booking[];
}
