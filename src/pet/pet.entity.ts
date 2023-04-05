import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  size: string;

  @Column()
  behavior: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  pictureUrl: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  available: boolean;

  @Column({ nullable: true })
  adoptedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
