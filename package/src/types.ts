import { SchemaOf } from 'yup';

export type SchemaError<T> = Partial<{ [key in keyof T]: string }>;

export type InputValue<T> = { value: T; error?: string };
export type FormValue<T> = { [key in keyof T]: InputValue<T[key]> };

export type InputProps<T> = InputValue<T> & {
  onChange: (value: T) => void;
};

export type FeildsValue<T> = {
  [key in keyof T]: InputProps<T[key]>;
};

export type Action<T> =
  | { type: 'change'; name: keyof T; value: T[keyof T] }
  | {
      type: 'reset';
      initialValue: FormValue<T>;
    }
  | { type: 'submit'; e: React.FormEvent<HTMLFormElement>; schema: SchemaOf<T>; onSubmit?: (value: T) => void };
