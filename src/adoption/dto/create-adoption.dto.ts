import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAdoptionDto {
  @IsNumber()
  @IsNotEmpty()
  tutor_id: number;

  @IsNumber()
  @IsNotEmpty()
  pet_id: number;
}
