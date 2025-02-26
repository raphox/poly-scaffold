import * as fs from 'fs';
import * as mustache from 'mustache';
import * as path from 'path';
import * as glob from 'glob';

import { Framework, FrameworkTemplate } from '@/types';
import { MUSTACHE_EXTENSION } from '@/lib/generate-files';

import FRAMEWORKS from './options';
import GENERATORS from './generators';

function initFramework(name: string): Framework {
  const { title, folder } = FRAMEWORKS[name];
  const templates = getTemplates(folder);

  return {
    title,
    folder,
    templates,
    generate(target: string, data: any) {
      return GENERATORS[name](this, target, data);
    },
    render(filePath: string, data: any) {
      const template = fs.readFileSync(filePath, 'utf8');

      return mustache.render(template, data);
    }
  };
}

function getTemplates(folder: string) {
  const templatesPath = path.join(__dirname, folder, 'templates');

  return glob
    .sync(`${templatesPath}/**/*${MUSTACHE_EXTENSION}`, { dot: true })
    .reduce((acc: FrameworkTemplate, template) => {
      const parts = template.split('/');
      const index = parts.indexOf(folder);
      const relativePath = parts.slice(index + 2, -1).join('/') || 'others';
      const fileName = parts[parts.length - 1].slice(0, -MUSTACHE_EXTENSION.length);

      acc[relativePath] ??= {};
      acc[relativePath][fileName] = template;

      return acc;
    }, {});
}

export { FRAMEWORKS, initFramework };
