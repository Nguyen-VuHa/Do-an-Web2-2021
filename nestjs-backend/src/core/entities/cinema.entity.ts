import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CinemaBanner } from './cinema-banner.entity';
import { Screen } from './screen.entity';

@Entity('cinemas')
export class Cinema {
  @PrimaryGeneratedColumn('increment')
  cinema_id: number;

  @Column({ type: 'varchar', length: 255 })
  cinema_name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  area: string;

  @Column({ type: 'varchar', length: 255 })
  embed_map_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @OneToMany(() => CinemaBanner, (banner) => banner.cinema)
  banners: CinemaBanner[];

  @OneToMany(() => Screen, (screen) => screen.cinema, { cascade: true })
  screens: Screen[];
}
