import * as fs from 'fs';
import * as ejs from 'ejs';
import * as path from 'path';
import * as glob from 'glob';
import * as inflection from 'inflection';

import { Framework, FrameworkTemplate } from '@/types';
import { TEMPLATE_EXTENSION } from '@/lib/generate-files';
import { MAPPED_TYPES, MAPPED_ZOD_TYPES } from '@/lib/attributes';

import FRAMEWORKS from './options';
import GENERATORS from './generators';

const helpers = {
  camelize: inflection.camelize,
  classify: inflection.classify,
  dasherize: inflection.dasherize,
  humanize: inflection.humanize,
  pluralize: inflection.pluralize,
  singularize: inflection.singularize,
  tableize: inflection.tableize,
  titleize: inflection.titleize,
  underscore: inflection.underscore,
  mapType: (type: keyof typeof MAPPED_TYPES) => MAPPED_TYPES[type] || type,
  mapZodType: (type: keyof typeof MAPPED_ZOD_TYPES) => MAPPED_ZOD_TYPES[type] || type,
};

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

      return ejs.render(template, {
        ...data,
        ...helpers,
      });
    }
  };
}

function getTemplates(folder: string) {
  const templatesPath = path.join(__dirname, folder, 'templates');

  return glob
    .sync(`${templatesPath}/**/*${TEMPLATE_EXTENSION}`, { dot: true })
    .reduce((acc: FrameworkTemplate, template) => {
      const parts = template.split('/');
      const index = parts.indexOf(folder);
      const relativePath = parts.slice(index + 2, -1).join('/') || 'others';
      const fileName = parts[parts.length - 1].slice(0, -TEMPLATE_EXTENSION.length);

      acc[relativePath] ??= {};
      acc[relativePath][fileName] = template;

      return acc;
    }, {});
}

export { FRAMEWORKS, initFramework };
