import { Module } from '@nestjs/common';
import { TutorModule } from './tutor/tutor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { PetModule } from './pet/pet.module';
import { ShelterModule } from './shelter/shelter.module';
import { AuthModule } from './auth/auth.module';
import { AdoptionModule } from './adoption/adoption.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
    }),
    TutorModule,
    PetModule,
    ShelterModule,
    AuthModule,
    AdoptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
