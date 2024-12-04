import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Seat } from './seat.entity';
import { Showtime } from './showtime.entity';

@Entity('cinemas')
export class Cinema {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Seat, (seat) => seat.cinema)
  seats: Seat[];

  @OneToMany(() => Showtime, (showtime) => showtime.cinema)
  showtimes: Showtime[];
}
