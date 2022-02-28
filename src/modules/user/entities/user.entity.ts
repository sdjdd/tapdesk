import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import argon2 from 'argon2';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude()
  tenant_id: number;

  @Column()
  username: string;

  @Column({ select: false })
  @Exclude()
  password?: string;

  @Column()
  email?: string;

  @CreateDateColumn({ update: false })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(data?: Partial<UserEntity>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  async setPassword(password: string) {
    this.password = await argon2.hash(password);
  }

  comparePassword(password: string): Promise<boolean> {
    if (this.password === undefined) {
      throw new Error('User entity has no password, check sql statement');
    }
    return argon2.verify(this.password, password);
  }
}
