import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { deepStrictEqual, match } from "assert";

import { Framework } from "../types";
import { initFramework } from ".";

describe('Next.js', () => {
  var tempDir: string;
  var framework: Framework;

  beforeEach(() => {
    framework = initFramework('next');
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'poly-scaffold-'));
  });

  it('render all files', async () => {
    framework.generate(tempDir, { resource: 'foo', name: 'bar' });

    const files = fs.readdirSync(tempDir, { recursive: true });
    deepStrictEqual(files.sort(), [
      // pages
      "pages",
      "pages/_app.tsx",
      "pages/_document.tsx",
      "pages/index.tsx",
      "pages/foo",
      "pages/foo/index.tsx",
      "pages/foo/new.tsx",
      "pages/foo/[id]",
      "pages/foo/[id]/edit.tsx",
      "pages/foo/[id]/index.tsx",

      // components
      "components",
      "components/foo-form.tsx",
      "components/foo.tsx",

      // shared
      ".env.local",
      "providers.tsx",
      "services.ts",
    ].sort());
  });

  it('render a single page', () => {
    const result = framework.render(framework.templates.pages.index, { name: 'World 2025' });

    match(result, /Hello, World 2025/);
  });
});
