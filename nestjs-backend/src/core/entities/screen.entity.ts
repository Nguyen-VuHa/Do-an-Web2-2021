import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cinema } from './cinema.entity';
import { Seat } from './seat.entity';
import { Showtime } from './showtime.entity';

export enum ScreenType {
  TWO_D = '2D',
  THREE_D = '3D',
  FOUR_D = '4D',
  IMAX = 'IMAX',
  ONYX_CINEMA = 'Onyx Cinema',
}

@Entity('screens')
export class Screen {
  @PrimaryGeneratedColumn('increment')
  screen_id: number;

  @Column({ type: 'varchar', length: 255 })
  screen_name: string;

  @Column({
    type: 'enum',
    enum: ScreenType,
    default: ScreenType.TWO_D, // Giá trị mặc định là 2D
  })
  screen_type: ScreenType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @ManyToOne(() => Cinema, (cinema) => cinema.screens)
  @JoinColumn({ name: 'cinema_id' }) // Liên kết với primary key của Cinema
  cinema: Cinema;

  @OneToMany(() => Seat, (seat) => seat.screen, { cascade: true })
  seats: Seat[];

  @OneToMany(() => Showtime, (showtime) => showtime.screen, { cascade: true })
  showtimes: Showtime[];
}
