# Next.js

The Next.js framework is a React framework that provides a great developer experience with many features that help you build web applications. It is a great choice for building server-rendered applications.

The following is the structure of the `next` directory:

```
├── next
│   ├── dependencies.ts
│   ├── index.ts
│   └── templates
│       ├── app
│       │   ├── layout.__ext__x.ejs
│       │   └── page.__ext__x.ejs
│       ├── pages
│       │   ├── _app.__ext__x.ejs
│       │   ├── _document.__ext__x.ejs
│       │   └── index.__ext__x.ejs
│       ├── providers.__ext__x.ejs
│       ├── services.__ext__.ejs
│       └── shared
│           ├── components
│           │   ├── __resource__.__ext__x.ejs
│           │   └── __resource__-form.__ext__x.ejs
│           └── pages
│               ├── edit.ejs
│               ├── list.ejs
│               ├── new.ejs
│               └── show.ejs
```

## Dependencies

Let's take a look at the `dependencies.ts` file:

```typescript
const axiosVersion = "1.7.9";
const hookformResolversVersion = "3.10.0";
const reactHookFormVersion = "7.54.2";
const reactQueryDevtoolsVersion = "5.66.0";
const reactQueryVersion = "5.66.0";
const reactSelectVersion = "5.10.0";
const zodVersion = "3.24.2";

export function getDependenciesVersionsToInstall() {
  return {
    "@hookform/resolvers": hookformResolversVersion,
    "@tanstack/react-query": reactQueryVersion,
    "@tanstack/react-query-devtools": reactQueryDevtoolsVersion,
    axios: axiosVersion,
    "react-hook-form": reactHookFormVersion,
    "react-select": reactSelectVersion,
    zod: zodVersion,
  };
}
```

This file contains the versions of the dependencies that will be installed when generating a Next.js application.

The stack includes the following dependencies:

- **React Hook Form:**
  A library for managing form state and validation.
- **Tanstack Query:**
  A library for managing server state in React applications.
- **Tanstack Query Devtools:**
  A set of devtools for Tanstack Query.
- **Axios:**
  A promise-based HTTP client for the browser and Node.js.
- **React Select:**
  A flexible and beautiful Select Input control for React.
- **Zod:**
  A TypeScript-first schema declaration and validation library.
