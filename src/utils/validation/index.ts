import { useForm } from "vee-validate";

import { authSchemas } from "../yup/schemas";

interface MyForm {
  email?: string | null;
  pass?: string | null;
}

export const useValidation = () => {
  const { values, errors, defineField, handleSubmit, resetForm, isSubmitting } = useForm<MyForm>({
    validationSchema: authSchemas,
  });

  const [email, emailProps] = defineField("email"); // { validateOnModelUpdate: false } lazy
  const [pass, passProps] = defineField("pass"); // { validateOnModelUpdate: false } lazy

  return {
    values,
    errors,
    handleSubmit,
    resetForm,
    isSubmitting,
    email,
    emailProps,
    pass,
    passProps,
  };
};
