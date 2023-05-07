import { BaseEntity, Column, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/auth.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Shelter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiHideProperty()
  @Column()
  user_id: number;

  @ApiHideProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
