import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(11, 11)
  phone: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  shelterId: number;
}
