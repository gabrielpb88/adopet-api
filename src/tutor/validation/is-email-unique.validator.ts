import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Repository } from 'typeorm';
import { Tutor } from '../tutor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Tutor)
    private readonly repository: Repository<Tutor>,
  ) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const found = await this.repository.findOneBy({ email: value });
    return !found;
  }
}

export const EmailUnique = (validationOptions?: ValidationOptions) => {
  return (obj: Object, property: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: EmailUniqueValidator,
    });
  };
};
