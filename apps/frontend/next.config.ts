import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['@gazette/shared'],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion']
  }
} satisfies NextConfig;

export default nextConfig;
