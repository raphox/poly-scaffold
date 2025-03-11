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

  // app level files
  await generateFiles({
    files: Object.values(templates.app),
    target: `${srcPath}/app`,
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Prompt, parser: "vue" },
  });

  // model level files
  await generateFiles({
    remaps: {
      "list.ejs": "__resources__/index.vue.ejs",
      "new.ejs": "__resources__/new.vue.ejs",
      "show.ejs": "__resources__/[id]/index.vue.ejs",
      "edit.ejs": "__resources__/[id]/edit/index.vue.ejs",
    },
    files: Object.values(templates["shared/pages"]),
    target: `${srcPath}/pages`,
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite, parser: "vue" },
  });

  // shared components
  await generateFiles({
    remaps: {
      "form.ejs": "__resources__/form.vue",
      "details.vue.ejs": "__resources__/details.vue",
      "types.ejs": "__resources__/types.ts",
    },
    files: Object.values(templates["shared/components"]),
    target: `${srcPath}/components`,
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Prompt, parser: "vue" },
  });

  // others
  await generateFiles({
    files: Object.values(templates["others"]),
    target: srcPath,
    substitutions: options,
    render: framework.render,
    options: { overwriteStrategy: OverwriteStrategy.Overwrite, parser: "vue" },
  });

  // package.json
  updateJson(`${srcPath}/../package.json`, (json) => {
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
