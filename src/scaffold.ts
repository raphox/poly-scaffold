
import { input, select } from '@inquirer/prompts';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';


import { FRAMEWORKS, initFramework } from "./frameworks";
import { parseAndValidateArgs } from './lib/attributes';
import normalizeOptions from './lib/normalize.options';

interface ScaffoldOptions {
  framework: string;
  resource: string;
  target: string;
  javascript: boolean;
  _: string[];
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('👋 until next time!');
  } else {
    // Rethrow unknown errors
    throw error;
  }
});

// Parse command line arguments with proper typing
const parseArgs = () => {
  const parsedArgs = yargs(hideBin(process.argv))
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
    .option('javascript', {
      type: 'boolean',
      default: false,
      description: 'Generate JavaScript files instead of TypeScript'
    })
    .parseSync() as ScaffoldOptions;

  return {
    ...parsedArgs,
    resource: parsedArgs.resource || undefined,
    framework: parsedArgs.framework || undefined,
    target: parsedArgs.target || undefined
  };
};

export async function main() {
  const args = parseArgs();

  // Prompt for framework if not provided
  const framework = args.framework || await select({
    message: 'Select a framework',
    choices: Object.keys(FRAMEWORKS).map((key) => ({
      name: FRAMEWORKS[key].title,
      value: key,
      disabled: FRAMEWORKS[key].disabled,
    }))
  });

  let resourceFromArgs = args.resource;

  if (!resourceFromArgs && !args._[0].includes(':')) {
    resourceFromArgs = args._.shift();
  }

  // Prompt for resource name if not provided
  const resource = resourceFromArgs || await input({
    message: 'Please enter the resource name:',
    validate: (value) => {
      if (!value.trim()) return 'Resource name cannot be empty';
      return true;
    }
  });

  // Prompt for target path if not provided
  const target = args.target || await input({
    message: 'Please enter the path where the file will be created:',
    default: 'tmp/src',
    validate: (value) => value.trim() ? true : 'Target path cannot be empty'
  });

  const { resourceName, attributes } = parseAndValidateArgs({
    ...args,
    framework,
    resource,
  });

  const options = normalizeOptions({
    ...args,
    framework,
    resource: resourceName,
    attributes
  });

  // Initialize the selected framework and generate the scaffold
  const frameworkInstance = initFramework(framework);
  await frameworkInstance.generate(target, options);

  console.info('✨ Scaffold generated successfully!');
}

// Only run if this is the main module
if (require.main === module) {
  main();
}
