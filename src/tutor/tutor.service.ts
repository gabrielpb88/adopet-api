import { Injectable } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Repository } from 'typeorm';
import { Tutor } from './entities/tutor.entity';
import { assignValues } from '../utils/assign';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TutorService {
  constructor(
    @InjectRepository(Tutor)
    private readonly repository: Repository<Tutor>,
  ) {}
  async create(createTutorDto: CreateTutorDto): Promise<Tutor> {
    const tutor = this.repository.create();
    assignValues(createTutorDto, tutor);
    return this.repository.save(tutor);
  }

  async findAll(): Promise<Tutor[]> {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tutor`;
  }

  update(id: number, updateTutorDto: UpdateTutorDto) {
    return `This action updates a #${id} tutor`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutor`;
  }
}
