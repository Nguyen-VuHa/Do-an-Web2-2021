import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

enum NotifyType {
  NORMAL = 'normal',
  LINK = 'link',
}

enum NotifyStatus {
  UNREAD = 'unread',
  READ = 'read',
  INTERACTIVE = 'interactive',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('increment')
  notify_id: number;

  @Column({ type: 'varchar', length: 1000 })
  message: string;

  @Column({ type: 'enum', enum: NotifyType })
  notify_type: NotifyType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  redirect_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @Column({ type: 'enum', enum: NotifyStatus })
  notify_status: NotifyStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User;
}
