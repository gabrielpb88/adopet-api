import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from './auth.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly service: AuthService,
  ) {}

  @ApiOperation({ summary: 'Register as new user' })
  @Post('signup')
  async signUp(@Body() createUserDto: AuthCredentialsDto): Promise<User> {
    return this.service.signUp(createUserDto);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('signin')
  async signIn(@Body() authDto: AuthCredentialsDto) {
    return this.service.signIn(authDto);
  }
}
