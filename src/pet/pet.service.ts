import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { assignToObject } from '@nestjs/core/repl/assign-to-object.util';
import { UpdatePetDto } from './dto/update-pet.dto';
import { User } from '../auth/auth.entity';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly repository: Repository<Pet>,
    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService,
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

  async create(createPetDto: CreatePetDto, user: User): Promise<Pet> {
    const { shelter } = await this.employeeService.findById(user.id);
    const pet = this.repository.create();
    assignToObject(pet, createPetDto);
    pet.shelter = shelter;
    await this.repository.insert(pet);
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto, user: User): Promise<Pet> {
    const petToBeUpdated = await this.findById(id);
    const { shelter } = await this.employeeService.findById(user.id);
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
}
