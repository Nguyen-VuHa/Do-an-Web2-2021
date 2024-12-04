import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Cinema } from './cinema.entity';
import { Booking } from './booking.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Cinema, (cinema) => cinema.seats)
  cinema: Cinema;

  @Column({ type: 'varchar', length: 10 })
  seat_number: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
