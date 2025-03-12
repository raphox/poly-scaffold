# Poly Scaffold

Poly Scaffold is a command-line tool for generating scaffold code for various frameworks. It prompts the user for necessary inputs and generates the required files in the specified target directory.

## Motivation

Throughout my journey as a developer, I have always sought tools that optimize learning and increase productivity. One of the frameworks that helped me the most in this regard was **Ruby on Rails**, especially through its **scaffold** command. It not only allowed me to quickly generate CRUD structures but also served as a practical reference for understanding how system components interact. Additionally, as new best practices and patterns emerged, the scaffold reflected these changes, keeping me up to date with modern development approaches.

In the JavaScript ecosystem, particularly with **Next.js** and **Nuxt.js**, I noticed the lack of a similar tool: one that could not only speed up CRUD creation but also serve as a guide for new developers while ensuring standardized and scalable code.

Thus, **Poly-Scaffold** was born. It is designed to:

- **Provide a solid and structured foundation** for CRUDs across major modern JavaScript frameworks.
- **Reduce repetitive code** when implementing common operations like creating, reading, updating, and deleting records.
- **Maintain a clean and organized project structure**, facilitating collaboration among developers.
- **Incorporate best practices from the ecosystem**, allowing new developers to learn and apply modern concepts while building their projects.
- **Unify common approaches** across different frameworks, making CRUD development more consistent and predictable.

Beyond leveraging each framework’s native structure, **Poly-Scaffold** enhances it with some of the most widely used libraries to improve efficiency and robustness:

- **[Zod](https://github.com/colinhacks/zod)** – Schema validation to ensure data integrity.
- **[TanStack Query](https://tanstack.com/query/latest)** – Advanced caching and asynchronous data fetching management.
- **[Axios](https://axios-http.com/)** – Simplified API consumption with an intuitive HTTP client.
- **Integrated Form Validation** – Adopting best practices for each framework to ensure functional and accessible forms.

With this approach, **Poly-Scaffold** does more than generate code—it establishes a modern and optimized workflow, allowing developers to focus on business logic rather than repetitive implementation details.

## Features

- 🏗️ **Scaffolding for CRUD operations** – Quickly generate models, services, and UI components.
- 📦 **Multi-framework support** – Compatible with Next.js, Nuxt.js, Next.js + ShadCN, and Nuxt.js + ShadCN.
- ⚡ **Optimized API calls** – Uses Axios and TanStack Query for efficient data fetching and caching.
- 🎨 **Pre-styled UI components** — When using ShadCN, components come pre-styled and ready for production. Scaffolding without any advanced style features is also available, giving you total control over what you need.
- 📚 **Type-safe validation** – Powered by Zod to ensure consistent and secure data handling.
- 🔄 **Reusability and extensibility** – Easily customizable to fit different project requirements.

## Installation

To install the dependencies, run:

```bash
npm install -D poly-scaffold
# or
yarn add -D poly-scaffold
# or
pnpm add -D poly-scaffold
```

## Usage

You can run the tool using the following command:

```bash
npx poly-scaffold post title:string body:text
```

### Command Line Options

- `--help`: Show help [boolean]
- `--version`: Show version number [boolean]
- `--framework, -f`: Framework to use for scaffolding [string]
- `--resource, -r`: Resource name to scaffold [string]
- `--target, -t`: Target path for generated files [string]
- `--javascript, -j`: Generate JavaScript files instead of TypeScript [boolean] [default: false]
- `--templatesPath, -p`: Specify a custom template path. Leave blank to use the default templates for the selected framework [string]

### Example

```bash
npx poly-scaffold post title:string description:text -t ./

# Result:

├── components
│   ├── post-form.tsx
│   └── post.tsx
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   └── posts
│       ├── [id]
│       │   ├── edit.tsx
│       │   └── index.tsx
│       ├── index.tsx
│       └── new.tsx
├── providers.tsx
└── services.ts
```

Sample of generated code: [docs/samples](https://github.com/raphox/poly-scaffold/blob/gh-page/docs/samples).

## Development

### Adding a New Framework

To add a new framework, follow these steps:

1. Define the framework in the `FRAMEWORKS` object in `src/frameworks.ts`.
2. Implement the `initFramework` function to initialize the framework.

### Error Handling

The tool handles uncaught exceptions gracefully. If an `ExitPromptError` occurs, it logs a friendly message and exits. Other errors are rethrown.

## License

This project is licensed under the MIT License.
