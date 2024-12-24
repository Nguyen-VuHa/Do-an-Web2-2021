import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CinemaBanner } from './cinema-banner.entity';

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

  @OneToMany(() => CinemaBanner, (banner) => banner.cinema)
  banners: CinemaBanner[];
}
