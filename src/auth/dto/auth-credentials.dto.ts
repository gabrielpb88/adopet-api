import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Role } from '../../enums/role.enum';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  password: string;

  @IsOptional()
  roles: Role;
}
