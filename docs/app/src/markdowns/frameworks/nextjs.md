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

## Using Poly Scaffold with Next.js

Access your Next.js project directory and run the following command:

```bash
pscaffold post title:string description:text -f next -t ./
```

<a id="shadcn"></a>

## Improve your project using Shadcn UI

shadcn/ui is a set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks and AI models. Open Source. Open Code.

> This is not a component library. It is how you build your component library.

Get more information at [shadcn/ui](https://shadcn/ui).

## Templates

```
├── app
│   ├── layout.__ext__x.ejs
│   └── page.__ext__x.ejs
├── pages
│   ├── _app.__ext__x.ejs
│   ├── _document.__ext__x.ejs
│   └── index.__ext__x.ejs
├── providers.__ext__x.ejs
├── services.__ext__.ejs
├── shared
│   ├── components
│   │   ├── app-sidebar.__ext__x.ejs
│   │   ├── layout.__ext__x.ejs
│   │   ├── nav-main.__ext__x.ejs
│   │   ├── __resource__.__ext__x.ejs
│   │   ├── __resource__-form.__ext__x.ejs
│   │   ├── team-switcher.__ext__x.ejs
│   │   └── ui
│   │       ├── breadcrumb.__ext__x.ejs
│   │       ├── button.__ext__x.ejs
│   │       ├── collapsible.__ext__x.ejs
│   │       ├── form.__ext__x.ejs
│   │       ├── input.__ext__x.ejs
│   │       ├── label.__ext__x.ejs
│   │       ├── separator.__ext__x.ejs
│   │       ├── sheet.__ext__x.ejs
│   │       ├── sidebar.__ext__x.ejs
│   │       ├── skeleton.__ext__x.ejs
│   │       ├── table.__ext__x.ejs
│   │       └── tooltip.__ext__x.ejs
│   ├── hooks
│   │   └── use-mobile.__ext__x.ejs
│   ├── lib
│   │   └── utils.__ext__.ejs
│   └── pages
│       ├── edit.ejs
│       ├── list.ejs
│       ├── new.ejs
│       └── show.ejs
└── styles
    └── global.css.ejs
```

To use the Shadcn UI with Poly Scaffold, you can specify the `--framework` option as `next_and_shadcn`:

```bash
pscaffold post title:string description:text -f next_and_shadcn -t ./
```
