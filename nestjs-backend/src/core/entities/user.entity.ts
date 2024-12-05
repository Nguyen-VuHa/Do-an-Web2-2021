import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserPhoto } from './user-photo.entity';
import { Notification } from './notification.entity';

enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  fullname: string;

  @Column({ type: 'varchar', length: 20 })
  phone_number: string;

  @Column({ type: 'date', nullable: true })
  birth_day: Date;

  @Column({ type: 'enum', enum: UserGender, nullable: true })
  gender: UserGender;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cover_image_url: string;

  @Column({ type: 'bigint', nullable: true, default: 0 })
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @OneToMany(() => Notification, (notify) => notify.user)
  notifications: Notification[];

  @OneToMany(() => UserPhoto, (photo) => photo.user)
  photos: UserPhoto[];
}
