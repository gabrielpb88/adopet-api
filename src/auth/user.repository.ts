import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
