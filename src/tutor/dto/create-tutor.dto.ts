import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { EmailUnique } from '../validation/is-email-unique.validator';

export class CreateTutorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @EmailUnique({ message: 'Email already being used' })
  email: string;

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
