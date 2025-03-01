# Poly Scaffold

Poly Scaffold is a command-line tool for generating scaffold code for various frameworks. It prompts the user for necessary inputs and generates the required files in the specified target directory.

## Installation

To install the dependencies, run:

```bash
npm install
```

## Usage

You can run the tool using the following command:

```bash
node src/scaffold.js
```

### Command Line Options

- `--help`: Show help [boolean]
- `--version`: Show version number [boolean]
- `--framework, -f`: Framework to use for scaffolding [string]
- `--resource, -r`: Resource name to scaffold [string]
- `--target, -t`: Target path for generated files [string]
- `--javascript, --js`: Generate JavaScript files instead of TypeScript [boolean] [default: false]
- `--templatesPath, --tp`: Specify a custom template path. Leave blank to use the default templates for the selected framework [string]

### Example

```bash
pscaffold next post title:string description:text -t ./
```

## Development

### Adding a New Framework

To add a new framework, follow these steps:

1. Define the framework in the `FRAMEWORKS` object in `src/frameworks.ts`.
2. Implement the `initFramework` function to initialize the framework.

### Error Handling

The tool handles uncaught exceptions gracefully. If an `ExitPromptError` occurs, it logs a friendly message and exits. Other errors are rethrown.

## License

This project is licensed under the MIT License.
