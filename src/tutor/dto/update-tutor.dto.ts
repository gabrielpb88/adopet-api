import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorDto } from './create-tutor.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

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

  @IsString()
  @IsOptional()
  @MinLength(11)
  phone: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsUrl()
  @IsOptional()
  profilePictureUrl: string;
}
