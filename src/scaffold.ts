import { input, select } from '@inquirer/prompts';

import { FRAMEWORKS, initFramework } from "./frameworks";

var argv = require('yargs/yargs')(process.argv.slice(2))
  .option('framework', { alias: 'f', default: 'next' })
  .option('resource', { alias: 'r' })
  .option('target', { alias: 't' })
  .parse();

export default async function main() {
  const name = argv.framework || await select({
    message: 'Select a framework',
    choices: Object.keys(FRAMEWORKS).map((key) => {
      const { title, disabled } = FRAMEWORKS[key];
      return {
        name: title,
        value: key,
        disabled,
      }
    })
  });

  const resource = argv.resource || argv._[0] || await input({
    message: 'Please enter the resource name:',
    required: true
  });

  const target = argv.target || await input({
    message: 'Please enter the path where the file will create:',
    default: 'tmp/src',
    required: true
  });

  const framework = initFramework(name);

  framework.generate(target, { name: resource });

  console.info('Scaffold generated successfully!');
}

main();
