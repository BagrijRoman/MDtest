export const VALIDATOR_RULES = {
  email: "required|email",
  password: "required|minLength:5|maxLength:50",
  firstName: "required|minLength:3|maxLength:50",
  lastName: "required|minLength:3|maxLength:50",

  optionalName: "minLength:3|maxLength:50",
  middleName: "minLength:3|maxLength:50",

  stringId: "required|minLength:24|maxLength:24",

  address: "minLength:3|maxLength:200",
  extraInfo: "minLength:3|maxLength:200",

  offset: "required|min:0",
  limit: "required|min:1|max:100",
} as const;