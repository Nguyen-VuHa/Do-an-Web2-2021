import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cinema } from './cinema.entity';

@Entity('cinema_banners')
export class CinemaBanner {
  @PrimaryGeneratedColumn('increment')
  cinema_banner_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  banner_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @ManyToOne(() => Cinema, (cinema) => cinema.banners, { cascade: true, nullable: true })
  @JoinColumn({ name: 'cinema_id' }) // Tên cột khóa ngoại
  cinema: Cinema;
}
