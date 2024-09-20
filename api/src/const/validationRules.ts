export const VALIDATOR_RULES = {
  email: "required|email",
  password: "required|minLength:5|maxLength:50",
  firstName: "required|minLength:3|maxLength:50",
  lastName: "required|minLength:3|maxLength:50",

  offset: "required|min:0",
  limit: "required|min:1|max:100",
} as const;