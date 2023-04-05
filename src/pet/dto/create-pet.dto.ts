import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  age: string;

  @IsString()
  @IsOptional()
  size: string;

  @IsString()
  @IsOptional()
  behavior: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsUrl()
  @IsOptional()
  pictureUrl: string;
}
