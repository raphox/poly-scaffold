export type FrameworkGenerator = (framework: Framework, target: string, data: any) => void;
export type FrameworkTemplate = Record<string, Record<string, string>>;

export interface FrameworkOption {
  title: string;
  folder: string;
  disabled?: boolean | string;
}

export interface Framework {
  title: string;
  folder: string;
  templates: FrameworkTemplate;
  generate: (target: string, options: any) => void;
  render(fileName: string, data: any): string;
}

export interface ScaffoldSchema {
  framework: string;
  resource: string;
  path?: string;
  src?: boolean;
  javascript?: boolean;
  attributes?: { name: string, type: string }[];
  _?: string[] | undefined;
}

export interface NormalizedScaffoldSchema extends ScaffoldSchema {
  isTypescript: boolean;
  ext: 'ts' | 'js' | 'tsx' | 'jsx';
  resourceNames: {
    camelize: string;
    capitalize: string;
    classify: string;
    dasherize: string;
    humanize: string;
    plural: string;
    singular: string;
    table: string;
    titleize: string;
    underscore: string;
  }
}
