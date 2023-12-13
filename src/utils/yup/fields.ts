import * as yup from "yup";

export const email = yup.string().required("Email is required").email("Enter a valid email, example: test@gmail.com");

export const password = yup
  .string()
  .required("Password is required")
  .min(6)
  .matches(
    /^[a-zA-Z0-9]+$/ && /(?:[^`!@#$%"^&*<>|\\\-_=+'\/.,]*[`!@#$%"^&*<>|\\\-_=+'\/.,]){1}/,
    "A-Z, 0-9 and at least 1 special symbol, example Pass1!"
  );
