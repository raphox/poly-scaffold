import { input, select } from '@inquirer/prompts';
import { FRAMEWORKS, initFramework } from "./frameworks";
import yargs from 'yargs/yargs';

interface ScaffoldOptions {
  framework: string;
  resource: string;
  target: string;
  _: (string | number)[];
}

// Parse command line arguments with proper typing
const parseArgs = (): Partial<ScaffoldOptions> => {
  return yargs(process.argv.slice(2))
    .option('framework', {
      alias: 'f',
      type: 'string',
      description: 'Framework to use for scaffolding'
    })
    .option('resource', {
      alias: 'r',
      type: 'string',
      description: 'Resource name to scaffold'
    })
    .option('target', {
      alias: 't',
      type: 'string',
      description: 'Target path for generated files'
    })
    .parseSync();
};

export default async function main() {
  try {
    const args = parseArgs();

    const framework = args.framework || await select({
      message: 'Select a framework',
      choices: Object.keys(FRAMEWORKS).map((key) => ({
        name: FRAMEWORKS[key].title,
        value: key,
        disabled: FRAMEWORKS[key].disabled,
      }))
    });

    const resource = args.resource || args._?.[0] || await input({
      message: 'Please enter the resource name:',
      validate: (value) => {
        if (!value.trim()) return 'Resource name cannot be empty';
        return true;
      }
    });

    const target = args.target || await input({
      message: 'Please enter the path where the file will create:',
      default: 'tmp/src',
      validate: (value) => {
        if (!value.trim()) return 'Target path cannot be empty';
        return true;
      }
    });

    const frameworkInstance = initFramework(framework);
    await frameworkInstance.generate(target, { resource });

    console.info('✨ Scaffold generated successfully!');
  } catch (error) {
    console.error('Error during scaffolding:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Only run if this is the main module
if (require.main === module) {
  main();
}
