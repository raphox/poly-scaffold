import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { execaSync } from 'execa';
import { match, throws } from "assert";

describe('Next.js', () => {
  var tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'poly-scaffold-'));
  });
  // it('throw an error if no argument is provided', async () => {
  //   throws(
  //     () => execaSync`node dist/scaffold.js`,
  //     { message: /Error: No resource provided/ }
  //   );
  // });

  it('execute the command with success', () => {
    const { stdout } = execaSync`node dist/scaffold.js --framework next --resource index --target ${tempDir}`;
    match(stdout, /Scaffold generated successfully!/);
  });
});
