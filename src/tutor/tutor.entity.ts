import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tutor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
