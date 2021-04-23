import { useMemo, useState } from 'react';
import { SchemaOf, ValidationError } from 'yup';

export const useForm = <T>(schema: SchemaOf<T>, onSubmit?: (value: T) => void) => {
  const defaultValue = useMemo(() => schema.getDefault() as T, []);
  const [formValue, setFormValue] = useState<T>(defaultValue);
  const [formErrors, setFormErrors] = useState<ValidationError[] | null>(null);

  const validate = (value: T) => {
    let nextError: ValidationError[] | null = null;
    try {
      schema.validateSync(value, { abortEarly: false, stripUnknown: true });
    } catch (errors) {
      nextError = errors.inner as ValidationError[];
    }
    setFormErrors(nextError);
    const isValid = !nextError;
    return isValid;
  };

  const submit = () => {
    const isValid = validate(formValue);
    if (isValid && !!onSubmit) {
      onSubmit(formValue);
    }
  };

  const resetForm = () => {
    setFormValue(defaultValue);
  };

  return { value: formValue, errors: formErrors, submit, setFormValue, resetForm };
};
