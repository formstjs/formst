### 1) Introduction

**Formst** is a JS library for quickly building high-performance forms in React. Unlike most form libraries that are UI-First, Formst is **Data-First**.

### 2) Motivation:

While working on a recent project, [GeekyAnts](https://geekyants.com) devs realised that there was no easy way to build forms for React apps. Yes, there are solutions available but they're not quite optimal. It is difficult to find a single library that provides great UX, speed and features such as interdependency between form fields. That's when we decided to build Formst, a library that allows you to build high-performance, responsive forms for your React apps.

### 3) Features

- **High-performance**: \**\*\*Formst is MST-based which makes it *fast* and *powerful\*.
- **Responsive**: Create _responsive_ forms for your React apps _with ease_.
- **Forms for Everything**: Build _flat_, _stepper_ or _nested_ forms based on your app needs.
- **Middleware**: Use middleware to _modify form behaviour_ such as pre-processing input values.

### 4) Installation

Use 'yarn' or 'npm' to install this library as shown below:

```bash
# yarn
yarn add mst-form-creator

# npm
npm add mst-form-creator
```

### 5) Dependencies

MobX, mobx-react/mobx-react-lite and MobX-state-tree.

### 6) Usage

- Create a form model as shown below:

  ```tsx
  const TodoForm = createFormModel(
    'TodoForm',
    {
      title: types.string,
      description: types.string,
    },

    {
      validation: {
        title: ['required'],
        description: 'required',
      },
    }
  ).actions(self => ({
    onSubmit: () => {
      setTimeout(() => {
        alert(JSON.stringify(getSnapshot(self), null, 2));
      }, 100);
    },
  }));
  ```

- Create an instance of the model:

  ```tsx
  const todoForm = TodoForm.create({
    title: '',
    description: '',
  });
  ```

- Wrap the components inside _MSTForm_ and use the _Field_ API to render the fields:

  ```tsx
  <MSTForm formInstance={todoForm}>
    <form onSubmit={todoForm.handleSubmit}>
      <Field name="title" />
      <ErrorMessage name="title" />

      <br />

      <Field name="description" />
      <ErrorMessage name="description" />

      <button type="submit">Submit</button>
    </form>
  </MSTForm>
  ```

### 8) Tech Stack

React & Javascript.

### 9) Contributors

- Aditya Jamuar ([@GeekJamuar](https://twitter.com/geekjamuar?lang=en))
- Sanket Sahu ([@sanketsahu](https://twitter.com/sanketsahu))
- Himanshu Satija ([@HimanshuSatija\_](https://twitter.com/HimanshuSatija_))

### 10) How to Contribute

Thank you for your interest in contributing to Formst! We are lucky to have you 🙂 Head over to [Contribution Guidelines](https://github.com/syncstate/core/blob/master/CONTRIBUTING.md) and learn how you can be a part of a wonderful, growing community.

### 11) License

Licensed under the MIT License, Copyright © 2020 GeekyAnts. See [LICENSE](https://github.com/syncstate/core/blob/master/LICENSE) for more information.
