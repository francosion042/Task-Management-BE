import { ValidationOptions, registerDecorator } from 'class-validator';
import { ExistsInterface, IsUniqueInterface } from '../types';
import { IsUniqueConstraint } from './is-unique.validator';
import { ExistsConstraint } from './exists.validator';

// decorator function
export function IsUnique(
  options: IsUniqueInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}

export function Exists(
  options: ExistsInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Exists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: ExistsConstraint,
    });
  };
}
