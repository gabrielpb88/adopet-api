import { User } from 'src/auth/auth.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shelter } from '../shelter/shelter.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: number;

  @OneToOne((type) => Shelter)
  @JoinColumn()
  shelter: Shelter;

  @Column({ nullable: true })
  shelterId: number;

  @Column()
  name: string;
}
