import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './tutor.entity';
import { EmailUniqueValidator } from './validation/is-email-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor])],
  controllers: [TutorController],
  providers: [TutorService, EmailUniqueValidator],
})
export class TutorModule {}
