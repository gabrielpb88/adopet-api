import { Module } from '@nestjs/common';
import { AdoptionController } from './adoption.controller';
import { AdoptionService } from './adoption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoption } from './adoption.entity';
import { TutorModule } from '../tutor/tutor.module';
import { PetModule } from '../pet/pet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption]), TutorModule, PetModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
