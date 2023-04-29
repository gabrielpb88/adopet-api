import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { User } from './auth.entity';
import { ConflictException } from '@nestjs/common';

jest.mock('./user.repository');

describe('AuthService', () => {
  let service: AuthService;
  let repository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserRepository, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('SignUp', () => {
    it('should throw an error when trying to signup with an email that already exists', async () => {
      const mockedUser = new User();
      mockedUser.email = 'any_email@email.com';
      const createUserDto: AuthCredentialsDto = {
        email: 'any_email@email.com',
        password: 'any_pass',
        roles: null,
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockedUser);

      await expect(service.signUp(createUserDto)).rejects.toThrow(ConflictException);
      expect(repository.findOneBy).toHaveBeenCalledWith({ email: mockedUser.email });
    });

    it('should return created user without password', async () => {
      jest.spyOn(repository, 'create').mockReturnValueOnce(new User());
      jest.spyOn(repository, 'save').mockResolvedValue({
        email: 'any_email@email.com',
        password: 'any password',
        salt: 'any salt',
      } as unknown as User);

      const createUserDto: AuthCredentialsDto = {
        email: 'any_email@email.com',
        password: 'any_pass',
        roles: null,
      };
      const createdUser = await service.signUp(createUserDto);

      expect(createdUser.email).toBe('any_email@email.com');
      expect(createdUser.password).not.toBeDefined();
      expect(createdUser.salt).not.toBeDefined();
    });
  });
});
