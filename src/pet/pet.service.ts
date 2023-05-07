import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { assignToObject } from '@nestjs/core/repl/assign-to-object.util';
import { UpdatePetDto } from './dto/update-pet.dto';
import { User } from '../auth/auth.entity';
import { ShelterService } from '../shelter/shelter.service';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly repository: Repository<Pet>,
    private readonly shelterService: ShelterService,
  ) {}

  async getAll(skip: number = 0, take: number = 9): Promise<Pet[]> {
    return this.repository.find({
      where: {
        isAdopted: false,
      },
      skip,
      take,
    });
  }

  async findById(id: number): Promise<Pet> {
    const found = await this.repository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createPetDto: CreatePetDto, user: User): Promise<Pet> {
    const shelter = await this.shelterService.findByUserId(user.id);
    const pet = this.repository.create();
    assignToObject(pet, createPetDto);
    pet.shelter = shelter;
    await this.repository.insert(pet);
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto, user: User): Promise<Pet> {
    const petToBeUpdated = await this.findById(id);
    const shelter = await this.shelterService.findByUserId(user.id);
    if (shelter.id !== petToBeUpdated.shelter.id) {
      throw new ForbiddenException(`This pet is not at your shelter`);
    }
    assignToObject(petToBeUpdated, updatePetDto);
    return this.repository.save(petToBeUpdated);
  }

  async remove(id: number): Promise<Pet> {
    const petToBeRemoved = await this.findById(id);
    await this.repository.softRemove(petToBeRemoved);
    return;
  }

  async adopt(id: number): Promise<void> {
    await this.repository.update(id, { isAdopted: true });
    return;
  }
}
