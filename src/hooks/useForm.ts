import { useCallback, useMemo, useState } from 'react';
import { Asserts, SchemaOf, ValidationError } from 'yup';
import { InputProps } from '../types/InputProps';
import { SchemaError } from '../types/SchemaError';
import { fieldsFactory } from '../utils/fieldsFactory';

export type FieldsType<T> = { [key in keyof Asserts<SchemaOf<T>>]: InputProps<Asserts<SchemaOf<T>>[key]> };

export type UseFormType<T> = {
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
} & FieldsType<T>;

export const useForm = <T>(schema: SchemaOf<T>, onSubmit?: (value: Asserts<typeof schema>) => void): UseFormType<T> => {
  const defaultValue = useMemo(() => schema.getDefault() as Asserts<typeof schema>, []);
  const [formValue, setFormValue] = useState<Asserts<typeof schema>>(defaultValue);
  const [formErrors, setFormErrors] = useState<SchemaError<Asserts<typeof schema>>>({});

  const validate = useCallback(
    (value: Asserts<typeof schema>) => {
      let nextError: ValidationError[] | null = null;
      try {
        schema.validateSync(value, { abortEarly: false, stripUnknown: true });
      } catch (errors) {
        nextError = errors.inner as ValidationError[];
      }
      let error: SchemaError<Asserts<typeof schema>> = {};
      if (nextError) {
        for (const err of nextError) {
          const path = err.path?.split('.');
          let current = error;
          if (path) {
            path.forEach((key, i) => {
              if (i === path.length - 1) {
                //@ts-ignore
                current[key] = err.message;
              } else {
                //@ts-ignore
                if (!current[key]) {
                  //@ts-ignore
                  current[key] = {};
                }
                //@ts-ignore
                current = current[key];
              }
            });
          }
        }
      }

      setFormErrors(error);
      const isValid = !nextError;
      return isValid;
    },
    [schema]
  );

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = validate(formValue);
      if (isValid && !!onSubmit) {
        onSubmit(formValue);
      }
    },
    [formValue, validate, onSubmit]
  );

  return { submit, ...fieldsFactory(formValue, setFormValue, formErrors, setFormErrors) };
};
