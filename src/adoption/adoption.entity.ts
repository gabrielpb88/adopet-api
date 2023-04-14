import { BaseEntity, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tutor } from '../tutor/tutor.entity';
import { Pet } from '../pet/pet.entity';
import { User } from '../auth/auth.entity';

@Entity()
export class Adoption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tutor_id: number;

  @Column()
  pet_id: number;

  @ManyToOne(() => Tutor, (tutor) => tutor.id)
  @JoinColumn({ name: 'tutor_id' })
  tutor: Tutor;

  @ManyToOne(() => Pet, (pet) => pet.id, { eager: true })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @DeleteDateColumn()
  deletedAt: Date;
}
