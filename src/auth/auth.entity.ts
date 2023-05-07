import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiHideProperty()
  @Column()
  salt: string;

  @ApiHideProperty()
  @Column({
    type: 'enum',
    enum: [Role.ShelterAdmin],
    nullable: true,
  })
  roles: Role;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
