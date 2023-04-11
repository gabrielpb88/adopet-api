import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Shelter } from './shelter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { assignValues } from '../utils/assign';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/auth.entity';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(Shelter)
    private readonly repository: Repository<Shelter>,

    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async create(createShelterDto: CreateShelterDto): Promise<Shelter> {
    const { name, phone, address, email, password } = createShelterDto;
    const shelter = this.repository.create();
    shelter.name = name;
    shelter.phone = phone;
    shelter.address = address;

    shelter.user = await this.authService.signUp({ email, password });
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

  async update(id: number, updateShelterDto: UpdateShelterDto, user: User) {
    const found = await this.findById(id);
    if (found.id !== user.id) {
      throw new ForbiddenException('Unauthorized access');
    }
    assignValues(updateShelterDto, found);
    return this.repository.save(found);
  }

  async remove(id: number, user: User): Promise<Shelter> {
    const found = await this.findById(id);
    if (found.id !== user.id) {
      throw new ForbiddenException('Unauthorized access');
    }
    await this.repository.softRemove(found);
    return found;
  }

  async findByUserId(id: number): Promise<Shelter> {
    const found = await this.repository.findOneBy({ user_id: id });
    if (!found) {
      throw new NotFoundException(`Shelter of id: ${id} not found`);
    }
    return found;
  }
}
