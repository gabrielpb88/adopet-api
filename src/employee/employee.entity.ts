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
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  user_id: number;

  @OneToOne((type) => Shelter)
  @JoinColumn({ name: 'shelter_id' })
  shelter: Shelter;

  @Column({ nullable: true })
  shelter_id: number;

  @Column()
  name: string;
}
