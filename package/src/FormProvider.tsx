import React, { useContext } from 'react';
import { FormValue } from './types';

const FormContext = React.createContext({});

type FormProps<T> = {
  submit?: (e: React.FormEvent<HTMLFormElement>) => void;
  value: FormValue<T>;
};

export const FormProvider: React.FC<FormProps<any>> = ({ children, submit, value }) => {
  return (
    <FormContext.Provider value={value}>
      {!submit ? children : <form onSubmit={submit}>{children}</form>}
    </FormContext.Provider>
  );
};

export function useFormContext<T>() {
  return useContext(FormContext) as FormValue<T>;
}
