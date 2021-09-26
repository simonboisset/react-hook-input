import React, { useContext } from 'react';
import { FieldsType } from '../hooks/useForm';

const FormContext = React.createContext({});

type FormProps<T> = {
  submit?: (e: React.FormEvent<HTMLFormElement>) => void;
  value: FieldsType<T>;
};

export const Form: React.FC<FormProps<any>> = ({ children, submit, value }) => {
  return (
    <FormContext.Provider value={value}>
      {!submit ? children : <form onSubmit={submit}>{children}</form>}
    </FormContext.Provider>
  );
};

export function useFormContext<T>() {
  return useContext(FormContext) as FieldsType<T>;
}
