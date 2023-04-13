import { Injectable } from '@nestjs/common';
import { Adoption } from './adoption.entity';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TutorService } from '../tutor/tutor.service';
import { PetService } from '../pet/pet.service';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(Adoption)
    private readonly adoptionRepository: Repository<Adoption>,
    private readonly tutorService: TutorService,
    private readonly petService: PetService,
  ) {}

  async adopt(dto: CreateAdoptionDto): Promise<Adoption> {
    const [tutor, pet] = await Promise.all([
      this.tutorService.findById(dto.tutor_id),
      this.petService.findById(dto.pet_id),
    ]);
    const adoption = await this.adoptionRepository.create();
    adoption.pet = pet;
    adoption.tutor = tutor;
    return this.adoptionRepository.save(adoption);
  }
}
