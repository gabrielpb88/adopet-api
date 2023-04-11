import { BaseEntity, Column, DeleteDateColumn, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../auth/auth.entity';

@Entity()
export class Tutor extends BaseEntity {
  @Column({ primary: true })
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id' })
  user: User;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @Column({ default: false })
  active: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
