import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Employee } from '../employee/employee.entity';

const ONE_YEAR_IN_MILLISECONDS = 60 * 60 * 24 * 365;

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employee]),
    JwtModule.register({
      secret: 'jwt-secret',
      signOptions: {
        expiresIn: ONE_YEAR_IN_MILLISECONDS,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
