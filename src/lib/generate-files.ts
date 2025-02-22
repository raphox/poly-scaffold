import * as path from 'path';
import * as fs from 'fs';
import { confirm } from '@inquirer/prompts';

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
  options ??= {};
  options.overwriteStrategy ??= OverwriteStrategy.Overwrite;

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
        continue;
      } else if (options.overwriteStrategy === OverwriteStrategy.Prompt) {
        const response = await confirm({ message: `File already exists, overwrite? (${computedPath})` });
        if (response === false) continue;
      } else if (
        options.overwriteStrategy === OverwriteStrategy.ThrowIfExisting
      ) {
        throw new Error(
          `Generated file already exists, not allowed by overwrite strategy in generator (${computedPath})`
        );
      }
    }

    const newFileContent = render(filePath, substitutions);

    fs.mkdirSync(path.dirname(computedPath), { recursive: true });
    fs.writeFileSync
      ? fs.writeFileSync(computedPath, newFileContent)
      : fs.writeFile(computedPath, newFileContent, () => { });
  };
}

function computePath(
  srcFolder: string,
  target: string,
  remaps: { [k: string]: string } | undefined,
  filePath: string,
  substitutions: { [k: string]: any }
): string {
  let computedPath = path.relative(srcFolder, filePath);

  if (computedPath.endsWith('.mustache')) {
    computedPath = computedPath.substring(0, computedPath.length - 9);
  }

  if (remaps && remaps[computedPath]) {
    computedPath = remaps[computedPath];
  }

  Object.entries(substitutions).forEach(([propertyName, value]) => {
    computedPath = computedPath.split(`__${propertyName}__`).join(value);
  });

  return path.join(target, computedPath);
}
