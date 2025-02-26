import { generateFiles, OverwriteStrategy } from "@/lib/generate-files";
import { Framework } from "@/types";

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

  await generateFiles({
    target: `${target}/pages`,
    files: Object.values(templates.pages),
    substitutions: { name: 'World 2025', ext: 'tsx', ...data },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Prompt }
  });

  await generateFiles({
    target: `${target}/pages/${data.resource}`,
    files: Object.values(templates['shared/pages']),
    remaps: {
      'list.mustache': 'index.__ext__.mustache',
      'new.mustache': 'new.__ext__.mustache',
      'edit.mustache': '[id]/edit.__ext__.mustache',
      'show.mustache': '[id]/index.__ext__.mustache',
    },
    substitutions: { name: 'World 2025', ext: 'tsx', ...data },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });

  await generateFiles({
    target: `${target}/components`,
    files: Object.values(templates['shared/components']),
    substitutions: { name: 'World 2025', ext: 'tsx', ...data },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });

  await generateFiles({
    target,
    files: Object.values(templates['shared']),
    substitutions: { name: 'World 2025', ext: 'ts', ...data },
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite }
  });
}
