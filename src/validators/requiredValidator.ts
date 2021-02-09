const requiredValidator = (value: any) => {
  if (!value) return false;
  return true;
};

export default requiredValidator;
