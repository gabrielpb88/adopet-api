import { ConflictException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = createUserDto;

    const found = await this.repository.findOneBy({ email });
    if (found) {
      throw new ConflictException(`email ${email} already being used`);
    }

    const user = this.repository.create();
    user.email = email;
    user.salt = await bcrypt.genSalt(12);
    user.password = await this.hashPassword(password, user.salt);

    await this.repository.save(user);
    delete user.salt;
    delete user.password;

    return user;
  }

  async signIn(authDto: AuthCredentialsDto) {
    const { email, password } = authDto;
    const user = await this.repository.findOneBy({ email });
    const isUserAndPasswordCorrect = user && user.password === (await this.hashPassword(password, user.salt));

    if (!isUserAndPasswordCorrect) {
      throw new HttpException('Authentication Error', 401);
    }
    const payload = { email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async hashPassword(password, salt) {
    return await bcrypt.hash(password, salt);
  }

  async findById(id: number): Promise<User> {
    const found = await this.repository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`User of id ${id} was not found`);
    }
    return found;
  }
}
