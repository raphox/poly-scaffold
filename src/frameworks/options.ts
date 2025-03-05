import { FrameworkOption } from "@/types";

const FRAMEWORKS: Record<string, FrameworkOption> = {
  next: {
    title: 'Next.js',
    folder: 'next',
  },
  next_and_shadcn: {
    title: 'Next.js + Shadcn/ui',
    folder: 'next_and_shadcn',
  },
  nuxt: {
    title: 'Nuxt.js',
    folder: 'nuxt',
    disabled: '(soon)',
  },
  esvelte: {
    title: 'SvelteKit',
    folder: 'svelte',
    disabled: '🚧'
  },
  express: {
    title: 'Express',
    folder: 'express',
    disabled: '🚧'
  },
  nest: {
    title: 'NestJS',
    folder: 'nest',
    disabled: '🚧'
  }
};

export default FRAMEWORKS;
