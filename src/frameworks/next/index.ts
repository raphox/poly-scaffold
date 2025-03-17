import * as fs from 'fs';

import { generateFiles, OverwriteStrategy } from "@/lib/generate-files";
import { Framework } from "@/types";
import { updateJson } from '@/lib/utils';
import { getDependenciesVersionsToInstall } from './dependencies';

export const generator = async function (framework: Framework, target: string, options: any) {
  const templates = framework.templates;
  const srcPath = `${target}${fs.existsSync(`${target}/src`) ? '/src' : ''}`;

  options.isAppRouter = fs.existsSync(`${target}/app`) || fs.existsSync(`${target}/src/app`);

  if (options.isAppRouter) {
    await generateFiles({
      files: Object.values(templates.app),
      target: `${srcPath}/app`,
      substitutions: options,
      render: framework.render,
      options: { overwriteStrategy: OverwriteStrategy.Prompt }
    });

    await generateFiles({
      remaps: {
        'list.ejs': '__resources__/page.__ext__x.ejs',
        'new.ejs': '__resources__/new/page.__ext__x.ejs',
        'show.ejs': '__resources__/[id]/page.__ext__x.ejs',
        'edit.ejs': '__resources__/[id]/edit/page.__ext__x.ejs',
        'layout.ejs': '__resources__/layout.__ext__x.ejs',
      },
      files: Object.values(templates['shared/pages']),
      target: `${srcPath}/app`,
      substitutions: options,
      render: framework.render,
      options: { overwriteStrategy: OverwriteStrategy.Overwrite }
    });
  } else {
    await generateFiles({
      files: Object.values(templates.pages),
      target: `${srcPath}/pages`,
      substitutions: options,
      render: framework.render,
      options: { overwriteStrategy: OverwriteStrategy.Prompt }
    });

    await generateFiles({
      remaps: {
        'list.ejs': '__resources__/index.__ext__x.ejs',
        'new.ejs': '__resources__/new.__ext__x.ejs',
        'show.ejs': '__resources__/[id]/index.__ext__x.ejs',
        'edit.ejs': '__resources__/[id]/edit.__ext__x.ejs',
        'layout.ejs': null,
      },
      files: Object.values(templates['shared/pages']),
      target: `${srcPath}/pages`,
      substitutions: options,
      render: framework.render,
      options: { overwriteStrategy: OverwriteStrategy.Overwrite }
    });
  }

  await generateFiles({
    files: Object.values(templates['shared/components']),
    target: `${srcPath}/components`,
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Prompt }
  });

  await generateFiles({
    files: Object.values(templates['others']),
    target: srcPath,
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });

  updateJson(`${srcPath}/../package.json`, (json) => {
    json.dependencies = {
      ...json.dependencies,
      ...getDependenciesVersionsToInstall()
    };

    return json;
  });

  fs.writeFileSync(`${target}/.env.local`, 'NEXT_PUBLIC_API_URL=http://localhost:3000/api');
}
