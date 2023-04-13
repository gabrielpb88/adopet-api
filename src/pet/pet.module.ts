import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
