import { Body, Controller, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from './auth.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Token } from './auth.interface';
import { GetUser } from './user.decorator';
import { AuthGuard } from '@nestjs/passport';

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
  async signIn(@Body() authDto: AuthCredentialsDto): Promise<Token> {
    return this.service.signIn(authDto);
  }

  @ApiOperation({ summary: 'Update user password' })
  @Put(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.service.updatePassword(id, updatePasswordDto, user);
  }
}
