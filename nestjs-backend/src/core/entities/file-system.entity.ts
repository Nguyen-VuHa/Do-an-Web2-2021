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

@Entity('file_systems')
export class FileSystem {
  @PrimaryGeneratedColumn('uuid')
  file_system_id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'enum', enum: ['folder', 'file'] })
  type: 'folder' | 'file';

  @ManyToOne(() => FileSystem, (node) => node.children, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_file_system_id' }) // Tên cột khóa ngoại
  parent: FileSystem | null;

  @OneToMany(() => FileSystem, (node) => node.parent)
  children: FileSystem[];

  @Column({ type: 'bigint', nullable: true })
  size: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mime_type: string | null;

  @Column({ type: 'text', nullable: true })
  path: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null; // Null nếu chưa bị xóa
}
