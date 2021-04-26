export type SchemaError<T> = Partial<
  { [key in keyof T]: T[key] extends { [k: string]: any } ? SchemaError<T[key]> : string }
>;
