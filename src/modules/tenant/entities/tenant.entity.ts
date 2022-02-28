import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tenants')
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  description?: string | null;

  @CreateDateColumn({ update: false })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(data?: Partial<TenantEntity>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
