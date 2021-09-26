---
sidebar_position: 1
---

# Getting Started

## Installation

```sh
yarn add react-hook-input yup
```

## Create an input component

With react-hook-input an input component will take the InputProps :

```ts
type InputProps<T> = {
  value: T;
  error: T extends { [k: string]: any } ? SchemaError<T> : string | null;
  onChange: (value: T) => void;
};
```

Create your component like this :

```tsx
import { InputProps } from 'react-hook-input';

const MyInputText: React.FC<InputProps<string>> = ({ value, error, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <input type='text' onChange={handleChange} value={value} />
      {!!error && <span>{error}</span>}
    </>
  );
};
```

## Create your first form

After Input components, you can now create your form component. You need to create a schema with yup for your form data.

```tsx
import { useForm, useInput, Form } from 'react-hook-input';

type MyData = {
  email: string;
  password: string;
};

const MySchema: Yup.SchemaOf<MyData> = Yup.object().shape({
  email: Yup.string().default('').required(),
  password: Yup.string().default('').required(),
});

const MyForm: React.FC = () => {
  const form = useForm(MySchema, (data: MyData) => mySubmitFct(data));
  const email = useInput(form, 'email');
  const password = useInput(form, 'password');

  return (
    <Form form={form}>
      <MyInputText {...email} />
      <MyInputText {...password} />
      <button type='submit'>submit</button>
    </Form>
  );
};
```
