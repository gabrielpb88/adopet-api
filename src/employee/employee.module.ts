import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { AuthModule } from '../auth/auth.module';
import { ShelterModule } from '../shelter/shelter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), AuthModule, ShelterModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
