import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import { EmployeeModule } from '../employee/employee.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), EmployeeModule, AuthModule],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
