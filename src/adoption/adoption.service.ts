import { ForbiddenException, Injectable } from '@nestjs/common';
import { Adoption } from './adoption.entity';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TutorService } from '../tutor/tutor.service';
import { PetService } from '../pet/pet.service';
import { User } from '../auth/auth.entity';
import { EmployeeService } from '../employee/employee.service';
import { Pet } from '../pet/pet.entity';
import { Employee } from '../employee/employee.entity';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(Adoption)
    private readonly adoptionRepository: Repository<Adoption>,
    private readonly tutorService: TutorService,
    private readonly petService: PetService,
    private readonly employeeService: EmployeeService,
  ) {}

  async adopt(dto: CreateAdoptionDto, loggedUser: User): Promise<Adoption> {
    const [tutor, pet] = await Promise.all([
      this.tutorService.findById(dto.tutor_id),
      this.petService.findById(dto.pet_id),
    ]);
    const employee = await this.employeeService.findById(loggedUser.id);
    if (!this._isPetAndEmployeeFromSameShelter(pet, employee)) {
      throw new ForbiddenException();
    }
    const adoption = await this.adoptionRepository.create();
    adoption.pet = pet;
    adoption.tutor = tutor;
    return this.adoptionRepository.save(adoption);
  }

  async remove(id: number, user: User): Promise<void> {
    const employee = await this.employeeService.findById(user.id);
    const adoption = await this.adoptionRepository.findOneBy({ id });
    if (adoption.pet.shelter.id !== employee.shelter.id) {
      throw new ForbiddenException();
    }
    await Promise.all([this.adoptionRepository.softDelete(id), this.petService.adopt(id)]);
    return;
  }

  private _isPetAndEmployeeFromSameShelter(pet: Pet, employee: Employee) {
    return pet.shelter.id === employee.shelter.id;
  }
}
