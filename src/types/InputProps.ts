export type InputProps<T> = {
  value: T;
  error: string | null;
  onChange: React.Dispatch<React.SetStateAction<T>>;
};
