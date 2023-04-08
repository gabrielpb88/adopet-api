import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateShelterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  phone: string;
}
