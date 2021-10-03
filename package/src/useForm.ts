import { Dispatch, Reducer, useMemo, useReducer } from 'react';
import { SchemaOf } from 'yup';
import { formReducer } from './formReducer';
import { Action, FormValue, InputValue, UseFormType } from './types';

const fieldsFactory = <T>(formValue: FormValue<T>, dispatch: Dispatch<Action<T>>) => {
  let fields = {} as { [key in keyof T]: InputValue<T[key]> & { onChange: (value: T[key]) => void } };
  for (const key in formValue) {
    fields[key] = {
      ...formValue[key],
      onChange: (value: T[typeof key]) => dispatch({ type: 'change', name: key, value }),
    };
  }
  return fields;
};

export const useForm = <T>(schema: SchemaOf<T>, onSubmit?: (value: T) => void): UseFormType<T> => {
  const defaultValue = useMemo(() => {
    const defaultSchemaValue = schema.getDefault() as T;
    let defaultFormValue = {} as FormValue<T>;
    for (const key in defaultSchemaValue) {
      defaultFormValue[key] = { value: defaultSchemaValue[key] };
    }
    return defaultFormValue;
  }, [schema]);

  const [formValue, dispatch] = useReducer(formReducer as Reducer<FormValue<T>, Action<T>>, defaultValue);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch({ type: 'submit', onSubmit, schema, e });
  };

  return { submit, ...fieldsFactory(formValue, dispatch) };
};

// export const useNestedForm = <T extends { [k: string]: any }>(input: InputProps<T>) => {
//   const error = !input.error || typeof input.error === 'string' ? {} : input.error;
//   return {
//     ...fieldsFactory(input.value, input.onChange),
//   };
// };
