import { Dispatch, SetStateAction } from 'react';
import { ValidationError } from 'yup';

export interface UseFormType<T> {
  value: T;
  errors: ValidationError[] | null;
  submit: () => void;
  setFormValue: Dispatch<SetStateAction<T>>;
  resetForm: () => void;
}
