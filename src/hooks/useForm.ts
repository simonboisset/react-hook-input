import { useCallback, useMemo, useState } from 'react';
import { SchemaOf, ValidationError } from 'yup';
import { InputProps } from '../types/InputProps';

export const useForm = <T>(schema: SchemaOf<T>, onSubmit?: (value: T) => void, input?: InputProps<T>) => {
  const defaultValue = useMemo(() => schema.getDefault() as T, []);
  const [val, setVal] = useState<T>(defaultValue);
  const [formErrors, setFormErrors] = useState<ValidationError[] | null>(null);

  const formValue = useMemo(() => (input ? input.value : val), [input, val]) as T;
  const setFormValue = useCallback(input ? input.onChange : setVal, [input, setVal]) as React.Dispatch<
    React.SetStateAction<T>
  >;

  const validate = useCallback(
    (value: T) => {
      let nextError: ValidationError[] | null = null;
      try {
        schema.validateSync(value, { abortEarly: false, stripUnknown: true });
      } catch (errors) {
        nextError = errors.inner as ValidationError[];
      }
      setFormErrors(nextError);
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
  }, [defaultValue]);

  return { value: formValue, errors: formErrors, submit, setFormValue, resetForm } as const;
};
