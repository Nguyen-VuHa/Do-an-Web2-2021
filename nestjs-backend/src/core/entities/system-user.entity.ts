import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('system_users')
export class SystemUser {
  @PrimaryGeneratedColumn('uuid') // Sử dụng UUID
  user_id: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa
}
