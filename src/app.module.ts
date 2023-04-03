import { Module } from '@nestjs/common';
import { TutorModule } from './tutor/tutor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TutorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
