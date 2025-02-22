import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { deepStrictEqual, match } from "assert";

import { Framework } from "../types";
import { initFramework } from ".";
import Next from "./next";

describe('Next.js', () => {
  var tempDir: string;
  var framework: Framework;

  beforeEach(() => {
    framework = initFramework('next');
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'poly-scaffold-'));
  });

  it('render all files', async () => {
    framework.generate(tempDir, { name: 'foo' });

    const files = fs.readdirSync(tempDir, { recursive: true });
    deepStrictEqual(files, [
      "_app.tsx",
      "_document.tsx",
      "components",
      "index.tsx",
      "pages",
      "providers.tsx",
      "services.ts",
      "components/foo-form.tsx",
      "components/foo.tsx",
      "pages/[id]",
      "pages/index.tsx",
      "pages/new.tsx",
      "pages/[id]/edit.tsx",
      "pages/[id]/index.tsx",
    ]);
  });

  it('render a single page', () => {
    const result = framework.render(framework.templates.pages.index, { name: 'World 2025' });

    match(result, /Hello, World 2025/);
  });
});
