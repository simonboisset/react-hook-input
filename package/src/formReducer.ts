import { ValidationError } from 'yup';
import { Action, FormValue } from './types';

const formValueToSchemaValue = <T>(formValue: FormValue<T>): T => {
  let value = {} as T;
  for (const key in formValue) {
    value[key] = formValue[key].value;
  }
  return value;
};

export function formReducer<T>(state: FormValue<T>, action: Action<T>) {
  switch (action.type) {
    case 'change': {
      let value = { ...state };
      value[action.name] = { value: action.value };
      return value;
    }
    case 'reset': {
      return action.initialValue;
    }
    case 'submit':
      {
        action.e.preventDefault();
        let formValue = { ...state };
        const value = formValueToSchemaValue(formValue);
        let nextError: ValidationError[] | null = null;
        try {
          action.schema.validateSync(value, { abortEarly: false, stripUnknown: true });
        } catch (errors) {
          nextError = errors.inner as ValidationError[];
        }
        if (nextError) {
          for (const error of nextError) {
            const key = error.path as keyof T | undefined;
            if (key) {
              formValue[key].error = error.message;
            }
          }
          return formValue;
        }
        if (!!action.onSubmit) {
          action.onSubmit(value);
          return formValue;
        }
      }
      return null;
  }
}
