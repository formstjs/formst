let customValidators: any = {};
export function defineValidators(validators: any) {
  customValidators = validators;
}
function isNil(value: any) {
  return value == null;
}
function required(value: any) {
  if (!value) return false;
  return true;
}
function isEmail(value: any) {
  let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!value || typeof value !== 'string' || !regex.test(value)) {
    return false;
  }
  return true;
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
