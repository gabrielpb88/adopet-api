import { Injectable, NotFoundException } from '@nestjs/common';
import { Shelter } from './shelter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { assignToObject } from '@nestjs/core/repl/assign-to-object.util';
import { assignValues } from '../utils/assign';
import { UpdateShelterDto } from './dto/update-shelter.dto';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(Shelter)
    private readonly repository: Repository<Shelter>,
  ) {}

  async create(createShelterDto: CreateShelterDto): Promise<Shelter> {
    const shelter = this.repository.create();
    assignToObject(shelter, createShelterDto);
    return this.repository.save(shelter);
  }

  async findById(id: number): Promise<Shelter> {
    const found = await this.repository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`shelter of ${id} was not found`);
    }
    return found;
  }

  async findAll(): Promise<Shelter[]> {
    return this.repository.find();
  }

  async update(id: number, updateShelterDto: UpdateShelterDto) {
    const found = await this.findById(id);
    assignValues(updateShelterDto, found);
    return this.repository.save(found);
  }

  async remove(id: number): Promise<Shelter> {
    const found = await this.findById(id);
    await this.repository.softRemove(found);
    return found;
  }
}
