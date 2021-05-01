import { InputError } from './InputError';

export interface InputProps<T> {
  value: T;
  error?: InputError<T>;
  onChange: (value: T) => void;
}
