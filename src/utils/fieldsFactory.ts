import { InputProps } from '../types/InputProps';
import { SchemaError } from '../types/SchemaError';

export const fieldsFactory = <T>(
  values: T,
  setValue: (value: T) => void,
  errors: SchemaError<T>,
  setErrors?: (errors: SchemaError<T>) => void
) => {
  const onChangeFactory = (name: keyof T) => (v: T[typeof name]) => {
    let nextValue: T = { ...values, [name]: v };
    if (!!setErrors) {
      const nextErrors = { ...errors };
      delete nextErrors[name];
      setErrors(nextErrors);
    }
    setValue(nextValue);
  };
  //@ts-ignore
  let fields: { [key in keyof T]: InputProps<T[key]> } = {};
  for (const key in values) {
    fields[key] = { value: values[key], onChange: onChangeFactory(key), error: errors ? errors[key] : undefined };
  }
  return fields;
};
