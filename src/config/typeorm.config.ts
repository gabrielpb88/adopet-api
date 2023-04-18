import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config = require('config');
const dbConfig = config.get('db');

export const typeormConfig: TypeOrmModuleOptions = {
  type: process.env.TYPE || dbConfig.get('type'),
  host: process.env.HOST || dbConfig.get('host'),
  port: process.env.PORT || dbConfig.get('port'),
  username: process.env.DB_USERNAME || dbConfig.get('username'),
  password: process.env.DB_PASS || dbConfig.get('password'),
  database: process.env.DB_NAME || dbConfig.get('database'),
  entities: [__dirname + '/**/*.entity.js'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
};
