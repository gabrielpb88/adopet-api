import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tutor } from '../tutor/tutor.entity';
import { Pet } from '../pet/pet.entity';
import { Shelter } from '../shelter/shelter.entity';
import { User } from '../auth/auth.entity';
import { Employee } from '../employee/employee.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'adopet',
  entities: [Tutor, Pet, Shelter, User, Employee],
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
};
