import { InputProps } from '../types/InputProps';
import { UseFormType } from '../types/UseFormType';

export const useInput = <T, G extends keyof T>(
  form: UseFormType<T>,
  name: G,
  handleChange?: (formvalue: T) => T
): InputProps<T[G]> => {
  const value: T[G] = form.value[name];

  const error = form.errors && form.errors[name];

  const onChange = (v: T[G]) => {
    let nextValue: T = { ...form.value, [name]: v };
    if (!!handleChange) {
      nextValue = handleChange(nextValue);
    }
    form.setFormValue(nextValue);
  };
  return { value, error, onChange } as InputProps<T[G]>;
};
