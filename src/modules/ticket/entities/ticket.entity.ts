import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/modules/user';
import { CategoryEntity } from '@/modules/category';
import { Exclude, Expose } from 'class-transformer';

@Entity('tickets')
@Exclude()
export class TicketEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  tenant_id: number;

  @Column()
  @Expose()
  category_id: number;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category?: CategoryEntity;

  @Column()
  @Expose()
  requester_id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'requester_id' })
  requester?: UserEntity;

  @Column()
  @Expose()
  assignee_id?: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'assignee_id' })
  assignee?: UserEntity;

  @Column()
  @Expose()
  subject: string;

  @Column()
  @Expose()
  description: string;

  @Column()
  @Expose()
  status: number;

  @CreateDateColumn({ update: false })
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;
}
