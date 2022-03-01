import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('categories')
@Exclude()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  tenant_id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children?: CategoryEntity[];

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  description: string;

  @Column()
  position?: number;

  @Column()
  @Expose()
  active: boolean;

  @CreateDateColumn({ update: false })
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  @Expose({ name: 'position' })
  getPosition(): number {
    return this.position ?? this.created_at.getTime();
  }
}
