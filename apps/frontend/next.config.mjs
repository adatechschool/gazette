/** @type {import('next').NextConfig} */
import process from 'node:process'

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  transpilePackages: ['@gazette/shared'],

  experimental: {
    optimizePackageImports: ['@chakra-ui/react', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  compiler: {
    emotion: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 an
  },

  compress: true,

  swcMinify: true,

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            minSize: 20000,
            maxSize: 244000,
          },
          chakra: {
            test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
            name: 'chakra',
            chunks: 'all',
            priority: 10,
            minSize: 20000,
            maxSize: 244000,
          },
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide',
            chunks: 'all',
            priority: 5,
            minSize: 20000,
            maxSize: 244000,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 15,
            minSize: 20000,
            maxSize: 244000,
          },
          utils: {
            test: /[\\/]node_modules[\\/](lodash|lodash-es|date-fns)[\\/]/,
            name: 'utils',
            chunks: 'all',
            priority: 5,
            minSize: 20000,
            maxSize: 244000,
          },
        },
      }

      config.optimization.usedExports = true
      config.optimization.sideEffects = false

      config.optimization.minimize = true

      config.optimization.moduleIds = 'deterministic'
      config.optimization.chunkIds = 'deterministic'
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
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
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
