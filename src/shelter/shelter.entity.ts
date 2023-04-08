import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @DeleteDateColumn()
  deletedAt: Date;
}
