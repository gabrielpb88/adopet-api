import { Module } from '@nestjs/common';
import { AdoptionController } from './adoption.controller';
import { AdoptionService } from './adoption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoption } from './adoption.entity';
import { TutorModule } from '../tutor/tutor.module';
import { PetModule } from '../pet/pet.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption]), TutorModule, PetModule, EmployeeModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
