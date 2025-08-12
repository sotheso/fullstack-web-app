import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Image optimization
  images: { 
    unoptimized: false,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/**',
      },
    ],
  },
  
  // Remove GitHub Pages specific config for production
  // basePath: '/fullstack-web-app',
  // assetPrefix: '/fullstack-web-app/',
  // trailingSlash: true
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Experimental features
  experimental: {
    // Enable if you want to use app directory
    // appDir: true,
  },
};

export default nextConfig;
