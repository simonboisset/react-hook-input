---
sidebar_position: 4
---

# Custom parser

You can add custom parser on input changes.

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
