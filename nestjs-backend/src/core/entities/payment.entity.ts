import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from './booking.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Booking, { eager: true })
  booking: Booking;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ['CREDIT_CARD', 'PAYPAL', 'CASH'], default: 'CREDIT_CARD' })
  payment_method: 'CREDIT_CARD' | 'PAYPAL' | 'CASH';

  @Column({ type: 'enum', enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' })
  status: 'PENDING' | 'SUCCESS' | 'FAILED';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
