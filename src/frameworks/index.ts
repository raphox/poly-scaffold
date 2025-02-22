import * as fs from 'fs';
import * as mustache from 'mustache';
import * as path from 'path';
import * as glob from 'glob';

import NextFramework from './next';
import NuxtFramework from './nuxt';
import { Framework, FrameworkTemplate, FrameworkInstance } from '../types';

export function initFramework(name: string): Framework {
  const { title, folder, klass } = FRAMEWORKS[name];
  const templates = getTemplates(folder);

  return {
    title,
    folder,
    templates,
    generate(target: string, data: any) {
      return klass.generate(this, target, data);
    },
    render(filePath: string, data: any) {
      const template = fs.readFileSync(filePath, 'utf8');

      return mustache.render(template, data);
    }
  };
}

function getTemplates(folder: string) {
  const templatesPath = path.join(__dirname, '..', 'templates', folder);

  return glob
    .sync(`${templatesPath}/**/*.mustache`)
    .reduce((acc: FrameworkTemplate, template) => {
      const parts = template.split('/');
      const index = parts.indexOf(folder);
      const relativePath = parts.slice(index + 1, -1).join('/') || 'others';
      const fileName = parts[parts.length - 1].split('.')[0];

      acc[relativePath] ??= {};
      acc[relativePath][fileName] = template;

      return acc;
    }, {});
}

export const FRAMEWORKS: Record<string, FrameworkInstance> = {
  next: {
    title: 'Next.js',
    folder: 'next',
    klass: NextFramework
  },
  nuxt: {
    title: 'Nuxt.js',
    folder: 'nuxt',
    disabled: '(soon)',
    klass: NuxtFramework
  },
  esvelte: {
    title: 'SvelteKit',
    folder: 'svelte',
    disabled: '🚧'
  },
  express: {
    title: 'Express',
    folder: 'express',
    disabled: '🚧'
  },
  nest: {
    title: 'NestJS',
    folder: 'nest',
    disabled: '🚧'
  }
};
