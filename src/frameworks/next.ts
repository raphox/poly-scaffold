import { generateFiles, OverwriteStrategy } from "../lib/generate-files";
import { Framework } from "../types";

export const generator = async function (framework: Framework, target: string, data: any) {
  const templates = framework.templates;

  // console.log('templates', templates);

  // generateFiles({
  //   target,
  //   files: Object.values(templates.app),
  //   substitutions: { name: 'World 2025', ext: 'tsx', ...data },
  //   render: framework.render,
  //   options: { overwriteStrategy: OverwriteStrategy.Prompt }
  // });

  generateFiles({
    target: `${target}/pages`,
    files: Object.values(templates.pages),
    substitutions: { name: 'World 2025', ext: 'tsx', ...data },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Prompt }
  });

  generateFiles({
    target: `${target}/pages/${data.resource}`,
    files: Object.values(templates['shared/pages']),
    remaps: {
      'list': 'index.__ext__',
      'new': 'new.__ext__',
      'edit': '[id]/edit.__ext__',
      'show': '[id]/index.__ext__',
    },
    substitutions: { name: 'World 2025', ext: 'tsx', ...data },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });

  generateFiles({
    target: `${target}/components`,
    files: Object.values(templates['shared/components']),
    substitutions: { name: 'World 2025', ext: 'tsx', ...data },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });

  generateFiles({
    target,
    files: Object.values(templates['shared']),
    substitutions: { name: 'World 2025', ext: 'ts', ...data },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });
}
