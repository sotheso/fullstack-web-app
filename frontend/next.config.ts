import type { NextConfig } from "next";

// Static export for GitHub Pages; using basePath/assetPrefix for project pages under /pro
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/pro',
  assetPrefix: '/pro/'
};

export default nextConfig;
