import isNil from './validators/nilValidator';
import required from './validators/requiredValidator';
import isEmail from './validators/emailValidator';
let customValidators: any = {};
export function defineValidators(validators: any) {
  customValidators = validators;
}
export function getValidators() {
  const defaultValidators = {
    required: (value: any) => ({
      valid: !isNil(value) && value !== '' ? required(value) : false,
      message: 'This is a required field',
    }),

    number: (value: any) => ({
      valid: isNaN(value),
      message: 'Please enter a valid number',
    }),
    email: (value: any) => ({
      valid: isEmail(value),
      message: 'Please enter a valid email id',
    }),
  };

  return {
    ...defaultValidators,
    ...customValidators,
  };
}
