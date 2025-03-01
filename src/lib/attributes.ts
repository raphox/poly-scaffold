import * as z from 'zod';
import { transform } from 'inflection';

import { ScaffoldSchema } from '@/types';

// Define column types and attribute types
type ColumnType =
  'bigint'
  | 'binary'
  | 'blob'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'decimal'
  | 'float'
  | 'integer'
  | 'json'
  | 'jsonb'
  | 'primary_key'
  | 'references'
  | 'string'
  | 'text'
  | 'time'
  | 'timestamp'
  | 'uuid';

type AttributeType = 'Date' | 'boolean' | 'number' | 'object' | 'string';

// Map column types to attribute types
export const MAPPED_TYPES: { [key in ColumnType]: AttributeType } = {
  bigint: 'number',
  binary: 'number',
  blob: 'boolean',
  boolean: 'boolean',
  date: 'Date',
  datetime: 'Date',
  decimal: 'number',
  float: 'number',
  integer: 'number',
  json: 'object',
  jsonb: 'object',
  primary_key: 'number',
  references: 'number',
  string: 'string',
  text: 'string',
  time: 'Date',
  timestamp: 'Date',
  uuid: 'string',
};

type ZodType = 'boolean' | 'date' | 'number' | 'object' | 'string';

// Map column types to Zod types
export const MAPPED_ZOD_TYPES: { [key in ColumnType]: ZodType } = {
  bigint: 'number',
  binary: 'number',
  blob: 'boolean',
  boolean: 'boolean',
  date: 'date',
  datetime: 'date',
  decimal: 'number',
  float: 'number',
  integer: 'number',
  json: 'object',
  jsonb: 'object',
  primary_key: 'number',
  references: 'number',
  string: 'string',
  text: 'string',
  time: 'date',
  timestamp: 'date',
  uuid: 'string',
};

const COLUMN_TYPES = Object.keys(MAPPED_TYPES) as [string, ...string[]];

import debug from 'debug';
import chalk from 'chalk';

debug.enable('parsing-args');
const log = debug('parsing-args');

// Define schema for attribute validation
const AttributeSchema = z.object({
  name: z
    .string()
    .min(1)
    .regex(/^[a-z][a-z0-9_]*$/, {
      message:
        'Attribute name must start with a letter and can only contain lowercase letters, numbers, and underscores',
    }),
  type: z.enum(COLUMN_TYPES, {
    errorMap: (property) => {
      const { received } = { received: null, ...property };
      return {
        message: `'${received}' must be one of: ${COLUMN_TYPES.join(', ')}`,
      }
    },
  }),
});

// Define schema for command arguments validation
const CommandArgsSchema = z.object({
  resourceName: z
    .string()
    .min(1)
    .regex(/^[a-z][a-z0-9_]*$/, {
      message:
        'Resource name must start with a letter and can only contain lowercase letters, numbers, and underscores',
    }),
  attributes: z
    .array(AttributeSchema)
    .min(1, { message: 'At least one attribute is required' }),
});

// Function to parse and validate command arguments
export function parseAndValidateArgs(args: ScaffoldSchema) {
  try {
    const { resource: resourceName, _: attributeArgs } = args;
    const attributes = (attributeArgs || []).map((arg) => {
      const [name, type] = typeof arg === 'string' ? arg.split(':') : ['', ''];
      return { name, type };
    });

    return CommandArgsSchema.parse({
      resourceName: transform(resourceName, ['underscore', 'singularize']),
      attributes,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        log(chalk.red(`[ERROR]: ${err.message}`));
      });

      process.exit(0);
    }

    throw error;
  }
}
