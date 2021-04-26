import { Dispatch, SetStateAction } from 'react';
import { SchemaError } from './SchemaError';

export interface UseFormType<T> {
  value: T;
  errors: SchemaError<T>;
  submit: () => void;
  setFormValue: Dispatch<SetStateAction<T>>;
  resetForm: () => void;
}
