import { Repository } from 'typeorm';
import { Tutor } from './tutor.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TutorRepository extends Repository<Tutor> {
  constructor(
    @InjectRepository(Tutor)
    private readonly repository: Repository<Tutor>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
