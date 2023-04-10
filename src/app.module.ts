import { Module } from '@nestjs/common';
import { TutorModule } from './tutor/tutor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { PetModule } from './pet/pet.module';
import { ShelterModule } from './shelter/shelter.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TutorModule, PetModule, ShelterModule, AuthModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
