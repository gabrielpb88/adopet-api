import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: [Role.ShelterAdmin, Role.Employee],
    nullable: true,
  })
  roles: Role;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
