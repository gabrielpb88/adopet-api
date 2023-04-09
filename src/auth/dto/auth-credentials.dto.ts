import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  password: string;
}
