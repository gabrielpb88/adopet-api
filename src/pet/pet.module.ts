import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import { AuthModule } from '../auth/auth.module';
import { ShelterModule } from '../shelter/shelter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), AuthModule, ShelterModule],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
