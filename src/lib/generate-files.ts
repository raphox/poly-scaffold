import * as path from 'path';
import * as fs from 'fs';
import { confirm } from '@inquirer/prompts';
import debug from 'debug';
import chalk from 'chalk';

debug.enable('generator');

const SUBSTITUTION_PATTERN = /__([^_]+)__/g;
export const MUSTACHE_EXTENSION = '.mustache';

const log = debug('generator');

export enum OverwriteStrategy {
  Overwrite = 'overwrite',
  KeepExisting = 'keepExisting',
  ThrowIfExisting = 'throwIfExisting',
  Prompt = 'prompt',
}

export interface GenerateFilesOptions {
  overwriteStrategy?: OverwriteStrategy;
}

export async function generateFiles(
  {
    files, target, remaps, substitutions, render,
    options = { overwriteStrategy: OverwriteStrategy.Overwrite }
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

    if (fs.existsSync(computedPath)) {
      if (options.overwriteStrategy === OverwriteStrategy.KeepExisting) {
        log(chalk.yellow(`[SKIPPED] ${computedPath}`));
        continue;
      } else if (options.overwriteStrategy === OverwriteStrategy.Prompt) {
        const response = await confirm({ message: `Do you want to overwrite the file? (${computedPath})` });
        if (response === false) {
          log(chalk.yellow(`[SKIPPED] ${computedPath}`));
          continue;
        };
      } else if (
        options.overwriteStrategy === OverwriteStrategy.ThrowIfExisting
      ) {
        throw new Error(
          `Generated file already exists, not allowed by overwrite strategy in generator (${computedPath})`
        );
      }

      log(chalk.yellow(`[OVERWRITTEN] ${computedPath}`));
    } else {
      log(chalk.green(`[CREATED] ${computedPath}`));
    }

    const newFileContent = render(filePath, substitutions);

    fs.mkdirSync(path.dirname(computedPath), { recursive: true });
    fs.writeFileSync(computedPath, newFileContent);
  };
}

function computePath(
  srcFolder: string,
  target: string,
  remaps: { [k: string]: string } | undefined,
  filePath: string,
  substitutions: Record<string, string | number>
): string {
  if (!path.isAbsolute(srcFolder)) {
    throw new Error('Source folder must be an absolute path');
  }

  let computedPath = path.relative(srcFolder, filePath);

  if (remaps?.[computedPath]) {
    computedPath = remaps[computedPath];
  }

  if (computedPath.endsWith(MUSTACHE_EXTENSION)) {
    computedPath = computedPath.slice(0, -MUSTACHE_EXTENSION.length);
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