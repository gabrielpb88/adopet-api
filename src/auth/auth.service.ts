import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthTokenPayload } from './auth.interface';
import { Token } from './auth.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: AuthCredentialsDto): Promise<User> {
    const { email, password, roles } = createUserDto;
    const found = await this.repository.findOneBy({ email });
    if (found) {
      throw new ConflictException(`email ${email} already being used`);
    }
    const user = this.repository.create();
    user.email = email;
    user.salt = await bcrypt.genSalt(12);
    user.password = await this.hashPassword(password, user.salt);
    user.roles = roles;
    await this.repository.save(user);
    delete user.salt;
    delete user.password;
    return user;
  }

  async signIn(authDto: AuthCredentialsDto): Promise<Token> {
    const { email, password } = authDto;
    const user = await this.repository.findOneBy({ email });
    const isUserAndPasswordCorrect = user && user.password === (await this.hashPassword(password, user.salt));
    if (!isUserAndPasswordCorrect) {
      throw new HttpException('Authentication Error', 401);
    }
    const payload: AuthTokenPayload = { email };
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

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto, user: User): Promise<void> {
    const { password } = updatePasswordDto;
    const userFoundById = await this.findById(id);
    if (userFoundById.id !== user.id) {
      throw new ForbiddenException(`Unauthorized`);
    }
    userFoundById.password = await this.hashPassword(password, userFoundById.salt);
    await this.repository.save(userFoundById);
    return;
  }
}
