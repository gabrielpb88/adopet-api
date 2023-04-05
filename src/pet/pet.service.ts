import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { assignToObject } from '@nestjs/core/repl/assign-to-object.util';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly repository: Repository<Pet>,
  ) {}

  async getAll(): Promise<Pet[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Pet> {
    const found = await this.repository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const pet = this.repository.create();
    assignToObject(pet, createPetDto);
    await this.repository.insert(pet);
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const petToBeUpdated = await this.findById(id);
    assignToObject(petToBeUpdated, updatePetDto);
    return this.repository.save(petToBeUpdated);
  }

  async remove(id: number): Promise<Pet> {
    const petToBeRemoved = await this.findById(id);
    await this.repository.softRemove(petToBeRemoved);
    return;
  }
}
