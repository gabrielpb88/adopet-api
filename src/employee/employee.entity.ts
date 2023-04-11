import { User } from 'src/auth/auth.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Shelter } from '../shelter/shelter.entity';

@Entity()
export class Employee {
  @Column()
  phone: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true, primary: true })
  user_id: number;

  @OneToOne(() => Shelter)
  @JoinColumn({ name: 'shelter_id' })
  shelter: Shelter;

  @Column({ nullable: true })
  shelter_id: number;

  @Column()
  name: string;
}
