import * as yup from 'yup';

let customValidators: any = {};
export function defineValidators(validators: any) {
  customValidators = validators;
}
function isNil(value: any) {
  return value == null;
}
export function getValidators() {
  const defaultValidators = {
    required: (value: any) => ({
      valid:
        !isNil(value) && value !== ''
          ? yup
              .mixed()
              .required()
              .isValidSync(value)
          : false,
      message: 'This is a required field',
    }),

    number: (value: any) => ({
      valid: yup.number().isValidSync(value),
      message: 'Please enter a valid number',
    }),
    email: (value: any) => ({
      valid: yup
        .string()
        .email()
        .isValidSync(value),
      message: 'Please enter a valid email id',
    }),
  };

  return {
    ...defaultValidators,
    ...customValidators,
  };
}
