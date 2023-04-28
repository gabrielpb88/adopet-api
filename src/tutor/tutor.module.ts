import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './tutor.entity';
import { EmailUniqueValidator } from './validation/is-email-unique.validator';
import { AuthModule } from '../auth/auth.module';
import { TutorRepository } from './tutor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor]), AuthModule],
  controllers: [TutorController],
  providers: [TutorService, EmailUniqueValidator, TutorRepository],
  exports: [TutorService],
})
export class TutorModule {}
