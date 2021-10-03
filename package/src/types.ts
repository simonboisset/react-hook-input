import { SchemaOf } from 'yup';

export type SchemaError<T> = Partial<{ [key in keyof T]: string }>;

export type UseFormType<T> = {
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
} & FeildsValue<T>;

export type InputValue<T> = { value: T; error?: string };

export type FormValue<T> = { [key in keyof T]: InputValue<T[key]> };

export type FeildsValue<T> = {
  [key in keyof T]: InputValue<T[key]> & {
    onChange: (value: T[key]) => void;
  };
};

export type InputProps<T> = {
  value: T;
  error?: string;
  onChange: (value: T) => void;
};

export type Action<T> =
  | { type: 'change'; name: keyof T; value: T[keyof T] }
  | {
      type: 'reset';
      initialValue: FormValue<T>;
    }
  | { type: 'error'; errors: SchemaError<T> }
  | { type: 'submit'; e: React.FormEvent<HTMLFormElement>; schema: SchemaOf<T>; onSubmit?: (value: T) => void };
