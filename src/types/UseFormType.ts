import { SchemaError } from './SchemaError';

export interface UseFormType<T> {
  value: T;
  errors: SchemaError<T>;
  submit: () => void;
  setFormValue: (data: T) => void;
  resetForm: () => void;
}
