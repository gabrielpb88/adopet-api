import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
  @IsNotEmpty()
  password: string;
}
