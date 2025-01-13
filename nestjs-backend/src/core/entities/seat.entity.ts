import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Screen } from './screen.entity';
import { BookingHistory } from './booking-history.entity';

export enum SeatType {
  NORMAL = 'Normal',
  VIP = 'VIP',
  COUPLE = 'Couple',
}

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn('increment')
  seat_id: number;

  @Column({ type: 'varchar', length: 10 })
  seat_name: string;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column({
    type: 'enum',
    enum: SeatType,
    default: SeatType.NORMAL, // Loại ghế mặc định là Normal
  })
  seat_type: SeatType;

  @Column({ default: 0 })
  price_modifier: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @ManyToOne(() => Screen, (screen) => screen.seats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'screen_id' })
  screen: Screen;

  @OneToMany(() => BookingHistory, (history) => history.seat)
  booking_history: BookingHistory[];
}
