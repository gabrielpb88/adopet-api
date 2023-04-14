import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tutor } from '../tutor/tutor.entity';
import { Pet } from '../pet/pet.entity';
import { Shelter } from '../shelter/shelter.entity';
import { User } from '../auth/auth.entity';
import { Employee } from '../employee/employee.entity';

const config = require('config');
const dbConfig = config.get('db');

export const typeormConfig: TypeOrmModuleOptions = {
  type: process.env.TYPE || dbConfig.get('type'),
  host: process.env.HOST || dbConfig.get('host'),
  port: process.env.PORT || dbConfig.get('port'),
  username: process.env.DB_USERNAME || dbConfig.get('username'),
  password: process.env.DB_PASS || dbConfig.get('password'),
  database: process.env.DB_NAME || dbConfig.get('database'),
  entities: [Tutor, Pet, Shelter, User, Employee],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
};
