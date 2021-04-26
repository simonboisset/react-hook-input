import { InputProps } from '../types/InputProps';
import { UseFormType } from '../types/UseFormType';

export const useNestedForm = <T>(input: InputProps<T>): UseFormType<T> => {
  return {
    value: input.value,
    errors: input.error,
    submit: () => {},
    setFormValue: input.onChange,
    resetForm: () => {},
  } as UseFormType<T>;
};
