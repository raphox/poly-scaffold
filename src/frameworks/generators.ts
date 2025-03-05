import { FrameworkGenerator } from '@/types';

import { generator as nextGenerator } from './next';
import { generator as nextAndShadcnGenerator } from './next_and_shadcn';
import { generator as nuxtGenerator } from './nuxt';

const GENERATORS: Record<string, FrameworkGenerator> = {
  next: nextGenerator,
  next_and_shadcn: nextAndShadcnGenerator,
  nuxt: nuxtGenerator,
};

export default GENERATORS;
