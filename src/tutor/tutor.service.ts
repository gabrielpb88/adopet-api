import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Repository } from 'typeorm';
import { Tutor } from './tutor.entity';
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

  async findOne(id: number): Promise<Tutor> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateTutorDto: UpdateTutorDto) {
    const tutor = await this.findById(id);
    if (tutor.id !== id) {
      throw new ForbiddenException();
    }
    assignValues(updateTutorDto, tutor);
    return this.repository.save(tutor);
  }

  remove(id: number) {
    return `This action removes a #${id} tutor`;
  }

  async findById(id: number): Promise<Tutor> {
    const found = this.repository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`resource of ${id} was not found`);
    }
    return found;
  }
}
