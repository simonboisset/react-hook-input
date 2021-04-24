# react-hook-input

React Hooks for validation form

## Get Started

```sh
yarn add react-hook-input yup
```

## Create an input component

With react-hook-input an input component will take the InputProps :

```ts
type InputProps<T> = {
  value: T | undefined;
  error: string | null;
  onChange: (value: T | undefined) => void;
  label?: string;
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
      <input type="text" onChange={handleChange} value={value} />
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
      <button type="submit">submit</button>
    </Form>
  );
};
```

## Nested Form

you can create a nested Form with the props `nested`. Be carefull nested form are not real input elements. You can't use submit button in nested form.

```tsx
const MyNestedForm: React.FC = () => {
  const form = useForm(MySchema, (data: MyNestedData) => mySubmitFct(data));
  const email = useInput(form, 'email');
  const password = useInput(form, 'password');

  return (
    <Form form={form} nested>
      <MyInputText {...email} />
      <MyInputText {...password} />
    </Form>
  );
};
```

## Use Form Context

Each Form element, are providing Context with values of inputs.
You can use it for complex form.

```tsx
import { useFormContext } from 'react-hook-input';

const MyCustomInput: React.FC = () => {
  const email = useFormContext<MyData, 'email'>('email');
  const password = useFormContext<MyData, 'password'>('password');

  return (
    <>
      <MyInputText {...email} />
      <MyInputText {...password} />
    </>
  );
};
```

## Add custom trigger on input changes

With useInput :

```tsx
const password = useInput(form, 'password', (inputValue, formValue) => {
  console.log('This is the new input value', inputValue);
  console.log('This is the new form value', formValue);
});
```

Or useFormContext :

```tsx
const password = useFormContext<MyData, 'password'>('password', (inputValue, formValue) => {
  console.log('This is the new input value', inputValue);
  console.log('This is the new form value', formValue);
});
```
