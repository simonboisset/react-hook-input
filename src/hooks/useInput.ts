import { useCallback, useMemo } from 'react';
import { InputProps } from '../types/InputProps';
import { UseFormType } from '../types/UseFormType';

export const useInput = <T, G extends keyof T>(
  form: UseFormType<T>,
  name: G,
  handleChange?: (formvalue: T) => T
): InputProps<T[G]> => {
  const value: T[G] = useMemo(() => form.value[name], [form.value[name]]);

  const error = form.errors[name];

  const onChange = useCallback(
    (v: T[G]) =>
      form.setFormValue((prevValue) => {
        let nextValue: T = { ...prevValue, [name]: v };
        if (!!handleChange) {
          nextValue = handleChange(nextValue);
        }
        return nextValue;
      }),
    [handleChange, name]
  );

  return { value, error, onChange } as InputProps<T[G]>;
};
