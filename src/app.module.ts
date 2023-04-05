import { Module } from '@nestjs/common';
import { TutorModule } from './tutor/tutor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TutorModule, PetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
