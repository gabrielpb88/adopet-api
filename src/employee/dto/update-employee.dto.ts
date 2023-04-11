import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @Length(11, 11)
  @IsOptional()
  phone: string;
}
