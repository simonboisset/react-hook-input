import { InputError } from './InputError';

export type SchemaError<T> = Partial<{ [key in keyof T]: InputError<T[key]> }>;
