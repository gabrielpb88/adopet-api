import { BaseEntity, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Tutor } from '../tutor/tutor.entity';
import { Pet } from '../pet/pet.entity';

@Entity()
export class Adoption extends BaseEntity {
  @PrimaryColumn()
  tutor_id: number;

  @PrimaryColumn()
  pet_id: number;

  @ManyToOne(() => Tutor, (tutor) => tutor.id)
  @JoinColumn({ name: 'tutor_id' })
  tutor: Tutor;

  @ManyToOne(() => Pet, (pet) => pet.id)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
