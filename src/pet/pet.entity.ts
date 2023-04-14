import { BaseEntity, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shelter } from '../shelter/shelter.entity';

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

  @ManyToOne(() => Shelter, { nullable: false, eager: true })
  @JoinColumn({ name: 'shelter_id' })
  shelter: Shelter;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  isAdopted: boolean;

  @Column({ default: false })
  available: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
