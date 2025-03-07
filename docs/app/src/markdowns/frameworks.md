# Frameworks

Each framework has its own set of templates and dependencies. The templates are used to generate the files and the dependencies are used to install the necessary packages.

The following frameworks are supported:

- Next.js
- Next.js and Shadcn
- Nuxt.js

## The following is the structure of the `frameworks` directory:

```
├── frameworks.spec.ts
├── generators.ts
├── index.ts
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
├── next_and_shadcn
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
│       ├── shared
│       │   ├── components
│       │   │   ├── app-sidebar.__ext__x.ejs
│       │   │   ├── layout.__ext__x.ejs
│       │   │   ├── nav-main.__ext__x.ejs
│       │   │   ├── __resource__.__ext__x.ejs
│       │   │   ├── __resource__-form.__ext__x.ejs
│       │   │   ├── team-switcher.__ext__x.ejs
│       │   │   └── ui
│       │   │       ├── breadcrumb.__ext__x.ejs
│       │   │       ├── button.__ext__x.ejs
│       │   │       ├── collapsible.__ext__x.ejs
│       │   │       ├── form.__ext__x.ejs
│       │   │       ├── input.__ext__x.ejs
│       │   │       ├── label.__ext__x.ejs
│       │   │       ├── separator.__ext__x.ejs
│       │   │       ├── sheet.__ext__x.ejs
│       │   │       ├── sidebar.__ext__x.ejs
│       │   │       ├── skeleton.__ext__x.ejs
│       │   │       ├── table.__ext__x.ejs
│       │   │       └── tooltip.__ext__x.ejs
│       │   ├── hooks
│       │   │   └── use-mobile.__ext__x.ejs
│       │   ├── lib
│       │   │   └── utils.__ext__.ejs
│       │   └── pages
│       │       ├── edit.ejs
│       │       ├── list.ejs
│       │       ├── new.ejs
│       │       └── show.ejs
│       └── styles
│           └── globals.css.ejs
├── nuxt
│   └── index.ts
└── options.ts
```
