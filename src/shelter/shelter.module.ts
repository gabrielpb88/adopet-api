import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelter } from './shelter.entity';
import { ShelterController } from './shelter.controller';
import { ShelterService } from './shelter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shelter])],
  controllers: [ShelterController],
  providers: [ShelterService],
  exports: [ShelterService],
})
export class ShelterModule {}
