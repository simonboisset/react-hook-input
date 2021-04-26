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

you can create a nested Form with the props `nested`. Be carefull nested form are not real input elements.

```tsx
import { useForm, useInput, Form, useNestedForm } from 'react-hook-input';

type MyNestedFormType = {
  status: 'ON' | 'OFF';
  comments: string;
};

const myNestedSchema: Yup.SchemaOf<MyNestedFormType> = Yup.object().shape({
  comments: Yup.string().default('').required(),
  status: Yup.mixed().oneOf(['ON', 'OFF']).default('').required(),
});

type MyFormType = {
  firstname: string;
  lastname: string;
  age: number;
  extra: MyNestedFormType;
};

const mySchema: Yup.SchemaOf<MyFormType> = Yup.object().shape({
  firstname: Yup.string().default('').required(),
  lastname: Yup.string().default('').required(),
  age: Yup.number().default(0).required(),
  extra: myNestedSchema,
});

const MyNestedForm: React.FC = () => {
  const form = useForm<MyFormType>(mySchema, (data) => console.log(data));

  const inputFirstName = useInput(form, 'firstname');
  const inputLastName = useInput(form, 'lastname');
  const inputage = useInput(form, 'age');

  const inputExtra = useInput(form, 'extra');
  const nestedForm = useNestedForm(inputExtra);

  const inputComments = useInput(nestedForm, 'comments');
  const inputStatus = useInput(nestedForm, 'status');

  return (
    <Form form={form}>
      <MyInputText {...inputLike} />
      <MyInputText {...inputFirstName} />
      <MyInputText {...inputLastName} />
      <Form nested form={nestedForm}>
        <MyInputText {...inputStatus} />
        <MyInputText {...inputComments} />
      </Form>
      <Button type="submit">Submit</Button>
    </Form>
  );
};
```

## Use Form Context

Each Form element, are providing Context with values of inputs.
You can use it for complex form.
Nested contexts are also supported.

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

## Add custom parser on input changes

With useInput :

```tsx
const password = useInput(form, 'password', (formValue) => {
  console.log('This is the new form value', formValue);
  return parse(formValue);
});
```

Or useFormContext :

```tsx
const password = useFormContext<MyData, 'password'>('password', (formValue) => {
  console.log('This is the new form value', formValue);
  return parse(formValue);
});
```
