import { useCallback, useMemo, useState } from 'react';
import { SchemaOf, ValidationError } from 'yup';
import { SchemaError } from '../types/SchemaError';
import { UseFormType } from '../types/UseFormType';

export const useForm = <T>(schema: SchemaOf<T>, onSubmit?: (value: T) => void): UseFormType<T> => {
  const defaultValue = useMemo(() => schema.getDefault() as T, []);
  const [formValue, setFormValue] = useState<T>(defaultValue);
  const [formErrors, setFormErrors] = useState<SchemaError<T>>({});

  const validate = useCallback(
    (value: T) => {
      let nextError: ValidationError[] | null = null;
      try {
        schema.validateSync(value, { abortEarly: false, stripUnknown: true });
      } catch (errors) {
        nextError = errors.inner as ValidationError[];
      }
      let error: SchemaError<T> = {};
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

  const submit = useCallback(() => {
    const isValid = validate(formValue);
    if (isValid && !!onSubmit) {
      onSubmit(formValue);
    }
  }, [formValue, validate, onSubmit]);

  const resetForm = useCallback(() => {
    setFormValue(defaultValue);
  }, [defaultValue, setFormValue]);

  return { value: formValue, errors: formErrors, submit, setFormValue, resetForm } as UseFormType<T>;
};
