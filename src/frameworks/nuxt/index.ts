import * as fs from "fs";
import { generateFiles, OverwriteStrategy } from "@/lib/generate-files";
import { Framework } from "@/types";
import { updateJson } from "@/lib/utils";
import { getDependenciesVersionsToInstall } from "./dependencies";
import { TGeneratorOptions } from "../types";

export const generator = async function (
  framework: Framework,
  target: string,
  options: TGeneratorOptions,
) {
  const templates = framework.templates;
  const srcPath = target;

  // prettier parse fn
  const parser = (path: string) =>
    path.endsWith(".vue") ? "vue" : "typescript";

  // app level files
  await generateFiles({
    remaps: {
      "app.vue.ejs": "app.vue",
      "index.vue.ejs": "pages/index.vue",
      "nuxt.config.ts.ejs": "nuxt.config.ts",
    },
    files: Object.values(templates.app),
    target: `${srcPath}`,
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Prompt, parser },
  });
  await generateFiles({
    files: Object.values(templates.layout),
    target: `${srcPath}/layout`,
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Prompt, parser },
  });
  await generateFiles({
    files: Object.values(templates.types),
    target: `${srcPath}/types`,
    substitutions: options,
    render: framework.render,
    options: {
      overwriteStrategy: OverwriteStrategy.Prompt,
      parser,
    },
  });

  // composables
  await generateFiles({
    files: Object.values(templates.composables),
    target: `${srcPath}/composables`,
    substitutions: options,
    render: framework.render,
    options: {
      overwriteStrategy: OverwriteStrategy.Prompt,
      parser,
    },
  });

  // model store
  await generateFiles({
    files: Object.values(templates["stores"]),
    target: `${srcPath}/stores`,
    substitutions: options,
    render: framework.render,
    options: {
      overwriteStrategy: OverwriteStrategy.Prompt,
      parser,
    },
  });

  // model service
  await generateFiles({
    files: Object.values(templates["services"]),
    target: `${srcPath}/services`,
    substitutions: options,
    render: framework.render,
    options: {
      overwriteStrategy: OverwriteStrategy.Prompt,
      parser,
    },
  });

  // model components
  await generateFiles({
    remaps: {
      "types.ts.ejs": "__resources__/types.ts",
      "form.vue.ejs": "__resources__/form.vue",
      "details.vue.ejs": "__resources__/details.vue",
    },
    files: Object.values(templates["shared/components"]),
    target: `${srcPath}/components`,
    substitutions: options,
    render: framework.render,
    options: {
      overwriteStrategy: OverwriteStrategy.Prompt,
      parser,
    },
  });

  // model views
  await generateFiles({
    remaps: {
      "list.ejs": "__resources__/index.vue.ejs",
      "new.ejs": "__resources__/new.vue.ejs",
      "show.ejs": "__resources__/[id]/index.vue.ejs",
      "edit.ejs": "__resources__/[id]/edit/index.vue.ejs",
      "helpers.ts.ejs": "__resources__/[id]/helpers.ts",
    },
    files: Object.values(templates["shared/pages"]),
    target: `${srcPath}/pages`,
    substitutions: options,
    render: framework.render,
    options: {
      overwriteStrategy: OverwriteStrategy.Overwrite,
      parser: (path: string) => (path.endsWith(".vue") ? "vue" : "typescript"),
    },
  });

  // package.json
  updateJson(`${srcPath}/package.json`, (json) => {
    json.dependencies = {
      ...json.dependencies,
      ...getDependenciesVersionsToInstall(),
    };

    return json;
  });

  // env file
  fs.writeFileSync(
    `${target}/.env.local`,
    "NEXT_PUBLIC_API_URL=http://localhost:3000/api",
  );
};
