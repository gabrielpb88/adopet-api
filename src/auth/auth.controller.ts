import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from './auth.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly service: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: AuthCredentialsDto): Promise<User> {
    return this.service.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() authDto: AuthCredentialsDto) {
    return this.service.signIn(authDto);
  }
}
