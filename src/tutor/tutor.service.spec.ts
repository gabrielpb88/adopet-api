import { Test, TestingModule } from '@nestjs/testing';
import { TutorService } from './tutor.service';
import { TutorRepository } from './tutor.repository';
import { AuthService } from '../auth/auth.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { Tutor } from './tutor.entity';

jest.mock('../auth/auth.service');
jest.mock('./tutor.repository');

describe('TutorService', () => {
  let service: TutorService;
  let repository: TutorRepository;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorService, TutorRepository, AuthService],
    }).compile();

    service = module.get<TutorService>(TutorService);
    repository = module.get<TutorRepository>(TutorRepository);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Create', () => {
    it('should create tutor successfully when correct data is provided', async () => {
      jest.spyOn(repository, 'create').mockReturnValueOnce(new Tutor());
      jest.spyOn(repository, 'save');
      jest.spyOn(authService, 'signUp');
      const createDtoMock: CreateTutorDto = {
        name: 'any name',
        email: 'any_email@email.com',
        password: 'any_password',
      };

      await service.create(createDtoMock);

      expect(repository.create).toHaveBeenCalled();
      expect(authService.signUp).toHaveBeenCalledWith(createDtoMock);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });
});
