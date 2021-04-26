import React, { useCallback, useContext } from 'react';
import { useInput } from '../hooks/useInput';
import { InputProps } from '../types/InputProps';
import { UseFormType } from '../types/UseFormType';

const FormContext = React.createContext({});

type FormProps<T> = { form: UseFormType<T>; nested?: boolean };

export const Form: React.FC<FormProps<any>> = ({ children, form, nested }) => {
  const validateThenSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.submit();
    },
    [form.submit]
  );
  return (
    <FormContext.Provider value={form}>
      {nested ? children : <form onSubmit={validateThenSubmit}>{children}</form>}
    </FormContext.Provider>
  );
};

export function useFormContext<T, G extends keyof T = keyof T>(
  name: G,
  handleChange?: (formvalue: T) => T
): InputProps<T[G]> {
  const form = useContext(FormContext) as UseFormType<T>;
  const value = useInput<T, G>(form, name, handleChange);
  return value as InputProps<T[G]>;
}
