import * as yup from "yup";
import * as field from "./fields";

export const authSchemas = yup.object().shape({
  email: field.email,
  pass: field.password,
});
