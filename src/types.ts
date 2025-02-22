export interface FrameworkInstance {
  klass?: any;
  title: string;
  folder: string;
  disabled?: boolean | string;
}

export type FrameworkTemplate = Record<string, Record<string, string>>;

export interface Framework {
  title: string;
  folder: string;
  templates: FrameworkTemplate;
  generate: (target: string, data: any) => void;
  render(fileName: string, data: any): string;
}
