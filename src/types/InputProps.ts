export type InputProps<T> = {
  value: T;
  error: string | null;
  onChange: (value: T) => void;
};
