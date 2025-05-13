import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'maxDecimalPlaces', async: false })
export class MaxDecimalPlaces implements ValidatorConstraintInterface {
  validate(value: number, _args: ValidationArguments) {
    return Number.isFinite(value) && /^\d+(\.\d)?$/.test(value.toString());
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must have at most 1 digit after the decimal point`;
  }
}
