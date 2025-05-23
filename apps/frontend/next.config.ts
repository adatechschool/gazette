import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['@gazette/shared'],
} satisfies NextConfig;

export default nextConfig;
