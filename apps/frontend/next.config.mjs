/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  // Transpile le package shared car il contient des types/DTOs utilisés côté client
  transpilePackages: ['@gazette/shared'],

  experimental: {
    // Optimise les imports des packages UI
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

  // Optimisations pour les images et polices
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
