import { ValidationError } from 'yup';
import { Action, FormValue, SchemaError } from './types';

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
    case 'error': {
      let value = { ...state };
      for (const key in action.errors) {
        value[key].error = action.errors[key];
      }
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
          let errors: SchemaError<T> = {};
          for (const err of nextError) {
            const path = err.path?.split('.');
            let current = errors;
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
          for (const key in errors) {
            formValue[key].error = errors[key];
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
