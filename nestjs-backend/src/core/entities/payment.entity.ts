import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from './booking.entity';

@Entity('payment_types')
export class PaymentType {
  @PrimaryGeneratedColumn('increment')
  payment_type_id: number;

  @Column()
  payment_type_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @OneToOne(() => Booking, (booking) => booking.payment_type)
  booking: Booking;
}
