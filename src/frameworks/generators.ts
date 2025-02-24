import { FrameworkGenerator } from '../types';

import { generator as nextGenerator } from './next';
import { generator as nuxtGenerator } from './nuxt';

const GENERATORS: Record<string, FrameworkGenerator> = {
  next: nextGenerator,
  nuxt: nuxtGenerator,
};

export default GENERATORS;
