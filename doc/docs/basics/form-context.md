---
sidebar_position: 3
---

# Form Context

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
