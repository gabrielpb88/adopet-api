import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const config = require('config');
const appConfig = config.get('app');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || appConfig.get('jwtSecret'),
    });
  }

  async validate(payload: { email: string }): Promise<User> {
    const { email } = payload;
    const user = await this.repository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
