import { InputProps } from '../types/InputProps';
import { fieldsFactory } from '../utils/fieldsFactory';

export const useNestedForm = <T extends { [k: string]: any }>(input: InputProps<T>) => {
  const error = !input.error || typeof input.error === 'string' ? {} : input.error;
  return {
    ...fieldsFactory(input.value, input.onChange, error),
  };
};
