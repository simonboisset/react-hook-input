import React, { useCallback, useContext } from 'react';
import { useInput } from '../hooks/useInput';
import { UseFormType } from '../types/UseFormType';

const FormContext = React.createContext({});

type FormProps<T> = { children: JSX.Element; form: UseFormType<T>; nested?: boolean };

export function Form<T>({ children, form, nested }: FormProps<T>) {
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
}

export function useFormContext<T, G extends keyof T = keyof T>(name: G, handleChange?: (formvalue: T) => T) {
  const form = useContext(FormContext) as UseFormType<T>;
  const value = useInput<T, G>(form, name, handleChange);
  return value;
}
