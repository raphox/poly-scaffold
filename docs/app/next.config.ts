import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: "/poly-scaffold",
  images: {
    unoptimized: true,
  },
  /* config options here */
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        '*.md': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
