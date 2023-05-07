import { ForbiddenException, Injectable } from '@nestjs/common';
import { Adoption } from './adoption.entity';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TutorService } from '../tutor/tutor.service';
import { PetService } from '../pet/pet.service';
import { User } from '../auth/auth.entity';
import { Pet } from '../pet/pet.entity';
import { Shelter } from '../shelter/shelter.entity';
import { ShelterService } from '../shelter/shelter.service';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(Adoption)
    private readonly adoptionRepository: Repository<Adoption>,
    private readonly tutorService: TutorService,
    private readonly shelterService: ShelterService,
    private readonly petService: PetService,
  ) {}

  async adopt(dto: CreateAdoptionDto, loggedUser: User): Promise<Adoption> {
    const [tutor, pet] = await Promise.all([
      this.tutorService.findById(dto.tutor_id),
      this.petService.findById(dto.pet_id),
    ]);
    const shelter = await this.shelterService.findByUserId(loggedUser.id);
    console.log(shelter);
    if (!this._isPetFromSameShelter(pet, shelter)) {
      throw new ForbiddenException();
    }
    const adoption = await this.adoptionRepository.create();
    adoption.pet = pet;
    adoption.tutor = tutor;
    adoption.createdBy = loggedUser;
    return this.adoptionRepository.save(adoption);
  }

  async remove(id: number, user: User): Promise<void> {
    const shelter = await this.shelterService.findByUserId(user.id);
    const adoption = await this.adoptionRepository.findOneBy({ id });
    if (adoption.pet.shelter.id !== shelter.id) {
      throw new ForbiddenException();
    }
    await Promise.all([this.adoptionRepository.softDelete(id), this.petService.adopt(id)]);
    return;
  }

  private _isPetFromSameShelter(pet: Pet, shelter: Shelter) {
    return pet.shelter.id === shelter.id;
  }
}
