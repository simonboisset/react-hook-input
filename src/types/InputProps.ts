import { SchemaError } from './SchemaError';

export interface InputProps<T> {
  value: T;
  error: T extends { [k: string]: any } ? SchemaError<T> : string | null;
  onChange: (value: T) => void;
}
