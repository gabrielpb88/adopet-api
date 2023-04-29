import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Employee } from '../employee/employee.entity';
import { UserRepository } from './user.repository';

const config = require('config');
const appConfig = config.get('app');

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employee]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || appConfig.get('jwtSecret'),
      signOptions: {
        expiresIn: '1y',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy, UserRepository],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
