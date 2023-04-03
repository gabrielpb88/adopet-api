import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorDto } from './create-tutor.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTutorDto extends PartialType(CreateTutorDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
