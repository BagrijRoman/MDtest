import { Validator } from "node-input-validator";

export const validateByRules = async (data = {}, validationRules = {}) => {
  const validator = new Validator(data, validationRules);

  return validator.check();
};
