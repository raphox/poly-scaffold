import * as path from 'path';
import * as fs from 'fs';
import * as prettier from "prettier";
import debug from 'debug';
import chalk from 'chalk';
import { confirm } from '@inquirer/prompts';

const SUBSTITUTION_PATTERN = /__([^_]+)__/g;
export const TEMPLATE_EXTENSION = '.ejs';

debug.enable('generator');
const log = debug('generator');

export enum OverwriteStrategy {
  Overwrite = 'overwrite',
  KeepExisting = 'keepExisting',
  ThrowIfExisting = 'throwIfExisting',
  Prompt = 'prompt',
}

export interface GenerateFilesOptions {
  overwriteStrategy?: OverwriteStrategy;
  parser?: 'typescript' | 'javascript' | 'json' | 'css';
}

async function handleOverwriteStrategy(filePath: string, options: GenerateFilesOptions) {
  if (fs.existsSync(filePath)) {
    if (options.overwriteStrategy === OverwriteStrategy.KeepExisting) {
      log(chalk.yellow(`[SKIPPED] ${filePath}`));

      return false;
    } else if (options.overwriteStrategy === OverwriteStrategy.Prompt) {
      const response = await confirm({ message: `Do you want to overwrite the file? (${filePath})` });

      if (response === false) {
        log(chalk.yellow(`[SKIPPED] ${filePath}`));

        return false;
      };
    } else if (options.overwriteStrategy === OverwriteStrategy.ThrowIfExisting) {
      throw new Error(
        `Generated file already exists, not allowed by overwrite strategy in generator (${filePath})`
      );
    }
  }
}

export async function generateFiles(
  {
    files, target, remaps, substitutions, render,
    options = { overwriteStrategy: OverwriteStrategy.Overwrite, parser: 'typescript' }
  }:
    {
      files: string[],
      target: string,
      remaps?: { [k: string]: string },
      substitutions: { [k: string]: any },
      render: (template: string, data: any) => string,
      options: GenerateFilesOptions
    }
) {
  const srcFolder = path.dirname(files[0]);

  for (const filePath of files) {
    const computedPath = computePath(
      srcFolder,
      target,
      remaps,
      filePath,
      substitutions
    );

    const newFileContent = render(filePath, substitutions);
    const formattedContent = await prettier.format(newFileContent, { parser: options.parser || 'typescript' });

    if (fs.existsSync(computedPath)) {
      const existingContent = fs.readFileSync(computedPath, 'utf-8');

      if (existingContent === formattedContent) {
        log(chalk.blue(`[UNCHANGED] ${computedPath}`));

        continue;
      }
    }

    if (await handleOverwriteStrategy(computedPath, options) === false) {
      continue;
    } else {
      if (fs.existsSync(computedPath)) {
        log(chalk.yellow(`[OVERWRITTEN] ${computedPath}`));
      } else {
        log(chalk.green(`[CREATED] ${computedPath}`));
      }
    }

    fs.mkdirSync(path.dirname(computedPath), { recursive: true });
    fs.writeFileSync(computedPath, formattedContent);
  };
}

export async function overwriteFile(filePath: string, content: string, options: GenerateFilesOptions = { overwriteStrategy: OverwriteStrategy.Overwrite, parser: 'typescript' }) {
  const formattedContent = await prettier.format(content, { parser: options.parser || 'typescript' });

  if (fs.existsSync(filePath)) {
    const existingContent = fs.readFileSync(filePath, 'utf-8');

    if (existingContent === formattedContent) {
      log(chalk.blue(`[UNCHANGED] ${filePath}`));

      return;
    }
  }

  if (await handleOverwriteStrategy(filePath, options) === false) {
    return;
  } else {
    if (fs.existsSync(filePath)) {
      log(chalk.yellow(`[OVERWRITTEN] ${filePath}`));
    } else {
      log(chalk.green(`[CREATED] ${filePath}`));
    }
  }

  fs.writeFileSync(filePath, formattedContent);
}

function computePath(
  srcFolder: string,
  target: string,
  remaps: { [k: string]: string } | undefined,
  filePath: string,
  substitutions: Record<string, string>
): string {
  if (!path.isAbsolute(srcFolder)) {
    throw new Error('Source folder must be an absolute path');
  }

  let computedPath = path.relative(srcFolder, filePath);

  if (remaps?.[computedPath]) {
    computedPath = remaps[computedPath];
  }

  if (computedPath.endsWith(TEMPLATE_EXTENSION)) {
    computedPath = computedPath.slice(0, -TEMPLATE_EXTENSION.length);
  }

  computedPath = computedPath.replace(SUBSTITUTION_PATTERN, (_match, key) => {
    const value = substitutions[key];

    if (value === undefined) {
      throw new Error(`Missing substitution value for key: ${key}`);
    }

    return String(value);
  });

  return path.join(target, computedPath);
}
