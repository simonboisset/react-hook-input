---
sidebar_position: 2
---

# Nested Form

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
      <Button type='submit'>Submit</Button>
    </Form>
  );
};
```
