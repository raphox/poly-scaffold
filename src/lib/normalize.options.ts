import * as inflection from 'inflection';

import { ScaffoldSchema, NormalizedScaffoldSchema } from '@/types';

export default function normalizeOptions(options: ScaffoldSchema): NormalizedScaffoldSchema {
  const { framework, attributes, javascript } = options;
  const resource = inflection.transform(options.resource, ['singularize', 'dasherize']);

  return {
    attributes,
    framework,
    resource,
    resources: inflection.pluralize(resource),
    isTypescript: !javascript,
    ext: javascript ? 'js' : 'ts',
    resourceNames: {
      camelize: inflection.camelize(resource, true),
      capitalize: inflection.capitalize(resource),
      classify: inflection.classify(resource),
      dasherize: inflection.dasherize(resource),
      humanize: inflection.humanize(resource),
      plural: inflection.pluralize(resource),
      singular: inflection.singularize(resource),
      table: inflection.tableize(resource),
      titleize: inflection.titleize(resource),
      underscore: inflection.underscore(resource),
    }
  }
}
