import { Test, TestingModule } from '@nestjs/testing';
import { TutorService } from './tutor.service';
import { TutorRepository } from './tutor.repository';
import { AuthService } from '../auth/auth.service';

jest.mock('../auth/auth.service');
jest.mock('./tutor.repository');

describe('TutorService', () => {
  let service: TutorService;
  let repository: TutorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorService, TutorRepository, AuthService],
    }).compile();

    service = module.get<TutorService>(TutorService);
    repository = module.get<TutorRepository>(TutorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
