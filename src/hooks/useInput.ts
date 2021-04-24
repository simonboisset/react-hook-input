import { useCallback, useMemo } from 'react';
import { UseFormType } from '../types/UseFormType';

export const useInput = <T, G extends keyof T>(form: UseFormType<T>, name: G, handleChange?: (formvalue: T) => T) => {
  const value: T[G] = useMemo(() => form.value[name], [form.value[name]]);

  const error = useMemo(
    () =>
      form.errors && form.errors.filter((err) => err.path === name)[0]
        ? form.errors.filter((err) => err.path === name)[0].message
        : null,
    [form.errors]
  );

  const onChange = useCallback(
    (v: T[G]) =>
      form.setFormValue((prevValue) => {
        let nextValue: T = { ...prevValue, [name]: v };
        if (!!handleChange) {
          nextValue = handleChange(nextValue);
        }
        return nextValue;
      }),
    [handleChange]
  );

  return { value, error, onChange } as const;
};
