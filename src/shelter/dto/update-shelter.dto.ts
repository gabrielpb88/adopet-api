import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateShelterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(11, 11)
  phone: string;
}
