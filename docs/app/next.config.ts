import type { NextConfig } from "next";
import removeImports from "next-remove-imports";

/** @type {function(import("next").NextConfig): import("next").NextConfig}} */
const removeImportsFun = removeImports({
  // test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  // matchImports: "\\.(less|css|scss|sass|styl)$"
});

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === "production" ? "/poly-scaffold" : undefined,
  images: {
    unoptimized: true,
  },
  /* config options here */
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
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

export default removeImportsFun(nextConfig);
