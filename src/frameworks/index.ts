import * as fs from 'fs';
import * as mustache from 'mustache';
import * as path from 'path';
import * as glob from 'glob';

import { Framework, FrameworkTemplate } from '../types';

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
  const templatesPath = path.join(__dirname, '..', 'templates', folder);

  return glob
    .sync(`${templatesPath}/**/*.mustache`, { dot: true })
    .reduce((acc: FrameworkTemplate, template) => {
      const parts = template.split('/');
      const index = parts.indexOf(folder);
      const relativePath = parts.slice(index + 1, -1).join('/') || 'others';
      const fileName = parts[parts.length - 1].split('.')[0] || parts[parts.length - 1].replace('.mustache', '');

      acc[relativePath] ??= {};
      acc[relativePath][fileName] = template;

      return acc;
    }, {});
}

export { FRAMEWORKS, initFramework };
