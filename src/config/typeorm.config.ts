import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tutor } from '../tutor/tutor.entity';
import { Pet } from '../pet/pet.entity';
import { Shelter } from '../shelter/shelter.entity';
import { User } from '../auth/auth.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'adopet',
  entities: [Tutor, Pet, Shelter, User],
  synchronize: true,
};
