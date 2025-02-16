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
import { User } from './user.entity';

export enum UserPhotoType {
  AVATAR = 'avatar',
  COVER_IMAGE = 'cover',
}

@Entity('user_photos')
export class UserPhoto {
  @PrimaryGeneratedColumn('increment')
  user_photo_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @Column({ type: 'enum', enum: UserPhotoType })
  photo_type: UserPhotoType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // Liên kết với primary key của Cinema
  user: User;
}
