import type { NextConfig } from "next";

// Configuration for GitHub Pages
const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  basePath: '/pro',
  assetPrefix: '/pro/',
  trailingSlash: true
};

export default nextConfig;
