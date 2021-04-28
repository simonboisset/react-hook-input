import React, { useContext } from 'react';
import { FieldsType } from '../hooks/useForm';

const FormContext = React.createContext({});

type FormProps<T> = {
  submit?: (e: React.FormEvent<HTMLFormElement>) => void;
} & FieldsType<T>;

export const Form: React.FC<FormProps<any>> = ({ children, submit, ...other }) => {
  return (
    <FormContext.Provider value={other}>
      {!submit ? children : <form onSubmit={submit}>{children}</form>}
    </FormContext.Provider>
  );
};

export function useFormContext<T>() {
  return useContext(FormContext) as FieldsType<T>;
}
