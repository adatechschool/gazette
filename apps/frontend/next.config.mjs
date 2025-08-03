/** @type {import('next').NextConfig} */
import process from 'node:process'

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  transpilePackages: ['@gazette/shared'],

  experimental: {
    optimizePackageImports: ['@chakra-ui/react', 'lucide-react', 'react-i18next'],
    optimizeCss: false, // Disabled to avoid conflicts with CSS-in-JS
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // Optimisations SWC avancées
    swcTraceProfiling: true,
    // Optimisations pour navigateurs modernes
    forceSwcTransforms: true,
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
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            minSize: 20000,
            maxSize: 150000,
          },
          chakra: {
            test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
            name: 'chakra',
            chunks: 'all',
            priority: 10,
            minSize: 20000,
            maxSize: 200000,
          },
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide',
            chunks: 'all',
            priority: 5,
            minSize: 20000,
            maxSize: 100000,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 15,
            minSize: 20000,
            maxSize: 150000,
          },
          utils: {
            test: /[\\/]node_modules[\\/](lodash|lodash-es|date-fns)[\\/]/,
            name: 'utils',
            chunks: 'all',
            priority: 5,
            minSize: 20000,
            maxSize: 100000,
          },
        },
      }

      config.optimization.usedExports = true
      config.optimization.sideEffects = false

      config.optimization.minimize = true
      config.optimization.concatenateModules = true

      config.optimization.moduleIds = 'deterministic'
      config.optimization.chunkIds = 'deterministic'

      // Optimisations supplémentaires pour réduire le temps d'exécution
      config.optimization.runtimeChunk = 'single'
      config.optimization.splitChunks.cacheGroups.common = {
        name: 'common',
        minChunks: 2,
        chunks: 'all',
        priority: 1,
        reuseExistingChunk: true,
      }

      // Optimisations pour les modules externes
      config.externals = {
        ...config.externals,
        'react': 'React',
        'react-dom': 'ReactDOM',
      }

      // SWC minification est déjà activée avec swcMinify: true
      // Pas besoin de Terser car SWC est plus rapide et intégré
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Optimisations pour navigateurs modernes
    if (!isServer) {
      config.target = 'web'
    }

    // Éviter les polyfills inutiles
    config.resolve.alias = {
      ...config.resolve.alias,
      // Utiliser les versions modernes des modules
      'core-js': false,
      'regenerator-runtime': false,
    }

    // Optimisations pour réduire la taille des bundles
    if (config.optimization.splitChunks && config.optimization.splitChunks.cacheGroups) {
      config.optimization.splitChunks.cacheGroups.framework = {
        name: 'framework',
        test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
        priority: 20,
        chunks: 'all',
        enforce: true,
      }
    }

    // Optimisations de compression
    config.optimization.minimize = true

    // Alternative avec import() dynamique (si compression-webpack-plugin est installé)
    // const CompressionPlugin = await import('compression-webpack-plugin')
    // config.optimization.minimizer.push(
    //   new CompressionPlugin.default({
    //     algorithm: 'gzip',
    //     test: /\.(js|css|html|svg)$/,
    //     threshold: 10240,
    //     minRatio: 0.8,
    //   })
    // )

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
