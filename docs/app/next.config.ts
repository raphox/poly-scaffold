import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: "/poly-scaffold",
  images: {
    unoptimized: true,
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
