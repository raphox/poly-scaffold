export type TGeneratorAttributes = {
  name: string;
  type: string;
};

export type TGeneratorOptions = {
  attributes: TGeneratorAttributes[];
  framework: string; // nuxt / next / etc..
  resource: string; // Singular - e.g: post
  resources: string; // Plural - e.g: posts
  isTypescript: boolean;
  ext: string; // e.g: js / ts
  resourceNames: {
    camelize: string; // e.g: post
    capitalize: string; // e.g: Post
    classify: string; // e.g: Post
    dasherize: string; // e.g: post
    humanize: string; // e.g: Post
    plural: string; // e.g: posts
    singular: string; // e.g: post
    table: string; // e.g: posts
    titleize: string; // e.g: Post
    underscore: string; // e.g: post
  };
};
