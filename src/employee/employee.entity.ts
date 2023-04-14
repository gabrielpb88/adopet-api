import { User } from 'src/auth/auth.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Shelter } from '../shelter/shelter.entity';

@Entity()
export class Employee {
  @Column()
  phone: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ primary: true })
  user_id: number;

  @ManyToOne(() => Shelter, { eager: true })
  @JoinColumn({ name: 'shelter_id' })
  shelter: Shelter;

  @Column({ nullable: true })
  shelter_id: number;

  @Column()
  name: string;
}
