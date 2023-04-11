import { IsNotEmpty, IsString, Length } from 'class-validator';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';

export class CreateEmployeeDto extends AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(11, 11)
  phone: string;
}
