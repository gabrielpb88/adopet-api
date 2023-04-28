import { IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';

export class CreateTutorDto extends AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(11)
  phone?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsUrl()
  @IsOptional()
  profilePictureUrl?: string;
}
