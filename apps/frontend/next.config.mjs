/** @type {import('next').NextConfig} */
import process from 'node:process'

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  transpilePackages: ['@gazette/shared'],

  experimental: {
    optimizePackageImports: ['@chakra-ui/react', 'lucide-react', 'react-i18next'],
  },

  compiler: {
    emotion: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimisations de production
  productionBrowserSourceMaps: false,

  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 an
    // Optimisations pour réduire la taille
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
  },

  compress: true,

  swcMinify: true,

  webpack: (config, { dev, isServer }) => {
    // Optimisations simples et efficaces
    if (!dev && !isServer) {
      config.optimization.minimize = true
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
    }

    return config
  },

  generateEtags: true,

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              'default-src \'self\'',
              'script-src \'self\' \'unsafe-eval\' \'unsafe-inline\'',
              'style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com',
              'font-src \'self\' https://fonts.gstatic.com',
              'img-src \'self\' data: https:',
              'connect-src \'self\' http://localhost:3000',
              'frame-ancestors \'none\'',
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, must-revalidate',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
    ]
  },
}

export default nextConfig
