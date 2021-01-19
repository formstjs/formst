import * as yup from 'yup';
// @ts-ignore
import { MixedSchema } from 'yup/lib/mixed'; // Hack needed for TS issue
import isNil from 'lodash/isNil';

// @ts-ignore
window['yup'] = yup;
// @ts-ignore
window['isNil'] = isNil;

let customValidators: any = {};
export function defineValidators(validators: any) {
  customValidators = validators;
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
      message: 'Required',
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
