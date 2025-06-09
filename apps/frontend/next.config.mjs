/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['@gazette/shared'],
  experimental: {
    optimizePackageImports: [
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
  },
  compiler: {
    emotion: true,
  },
}

export default nextConfig
