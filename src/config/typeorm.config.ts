import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {Tutor} from "../tutor/entities/tutor.entity";

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'adopet',
  entities: [Tutor],
  synchronize: true,
};