import { ValidationError } from 'yup';
import { UseFormType } from '../types/UseFormType';

const getInputValue = <T, G extends keyof T>(formValue: T, name: G, formErrors: ValidationError[] | null) => {
  const value: T[G] = formValue[name];
  const error =
    formErrors && formErrors.filter((err) => err.path === name)[0]
      ? formErrors.filter((err) => err.path === name)[0].message
      : null;
  return { value, error };
};

export const useInput = <T, G extends keyof T>(form: UseFormType<T>, name: G) => {
  const { value, error } = getInputValue<T, G>(form.value, name, form.errors);
  const onChange = (v: T[G] | undefined) => form.setFormValue({ ...form.value, [name]: v });
  return { value, error, onChange };
};
