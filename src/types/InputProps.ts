export type InputProps<T> = {
  value: T | undefined;
  error: string | null;
  onChange: (value: T | undefined) => void;
  label?: string;
};
