import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import argon2 from 'argon2';

@Entity('users')
@Exclude()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ type: 'int' })
  tenant_id?: number | null;

  @Column()
  @Expose()
  username: string;

  @Column({ select: false })
  password?: string;

  @Column({ type: 'varchar' })
  @Expose()
  email?: string | null;

  @Column()
  @Expose()
  role: 'end-user' | 'agent' | 'admin' | 'system-admin';

  @CreateDateColumn({ update: false })
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
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

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isAgent() {
    return this.isAdmin() || this.role === 'agent';
  }
}
