import type { NextConfig } from "next";

// Configuration for GitHub Pages
const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  basePath: '/fullstack-web-app',
  assetPrefix: '/fullstack-web-app/',
  trailingSlash: true
};

export default nextConfig;
