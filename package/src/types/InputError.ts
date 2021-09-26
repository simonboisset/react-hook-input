import { SchemaError } from './SchemaError';

export type InputError<T> = undefined | T extends { [k: string]: any } ? SchemaError<T> : string;
