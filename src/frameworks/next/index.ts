import * as fs from 'fs';

import { generateFiles, OverwriteStrategy } from "@/lib/generate-files";
import { Framework } from "@/types";

export const generator = async function (framework: Framework, target: string, options: any) {
  const templates = framework.templates;

  options.isAppRouter = fs.existsSync(`${target}/pages/_app.${options.ext}x`);

  // generateFiles({
  //   target,
  //   files: Object.values(templates.app),
  //   substitutions: { ...options, ext: options.javascript ? 'js' : 'ts' },
  //   render: framework.render,
  //   options: { overwriteStrategy: OverwriteStrategy.Prompt }
  // });

  await generateFiles({
    target: `${target}/pages`,
    files: Object.values(templates.pages),
    substitutions: { ...options, ext: options.javascript ? 'jsx' : 'tsx' },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Prompt }
  });

  await generateFiles({
    target: `${target}/pages/${options.resource}`,
    files: Object.values(templates['shared/pages']),
    remaps: {
      'list.ejs': 'index.__ext__x.ejs',
      'new.ejs': 'new.__ext__x.ejs',
      'edit.ejs': '[id]/edit.__ext__x.ejs',
      'show.ejs': '[id]/index.__ext__x.ejs',
    },
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });

  await generateFiles({
    target: `${target}/components`,
    files: Object.values(templates['shared/components']),
    substitutions: { ...options, ext: options.javascript ? 'jsx' : 'tsx' },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });

  await generateFiles({
    target,
    files: Object.values(templates['others']),
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });
}
