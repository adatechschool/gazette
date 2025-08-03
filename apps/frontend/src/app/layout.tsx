'use client'

// Import critical components directly to avoid render blocking
import { ColorModeScript } from '@chakra-ui/react'
import ClientProviders from '@/components/providers/ClientProviders'

import { bebasNeue, poppins } from '@/fonts/fonts'
import { theme } from '@/theme/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${poppins.className} ${bebasNeue.className}`} style={{ height: '100%' }}>
      <head>
        <title>Gazette - Agrégateur de flux RSS</title>
        <meta name="description" content="Gazette est un agrégateur de flux RSS moderne qui vous permet de découvrir, organiser et partager vos sources d'information préférées." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#606c38" />

        {/* Optimisations de performance */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Preconnect to external APIs and resources */}
        <link rel="preconnect" href="http://localhost:3000" />
        <link rel="dns-prefetch" href="http://localhost:3000" />

        {/* Preconnect to Google Fonts (if still needed) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect to external image sources */}
        <link rel="preconnect" href="https://via.placeholder.com" />
        <link rel="dns-prefetch" href="https://via.placeholder.com" />

        {/* Preconnect to RSS feed sources */}
        <link rel="preconnect" href="https://www.bondyblog.fr" />
        <link rel="preconnect" href="https://api.arretsurimages.net" />
        <link rel="preconnect" href="https://api.blast-info.fr" />
        <link rel="dns-prefetch" href="https://www.bondyblog.fr" />
        <link rel="dns-prefetch" href="https://api.arretsurimages.net" />
        <link rel="dns-prefetch" href="https://api.blast-info.fr" />

        {/* Preload critical fonts */}
        <link rel="preload" href="/_next/static/media/poppins-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/_next/static/media/bebas-neue-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Preload critical images */}
        <link rel="preload" href="/bondyblog.svg" as="image" type="image/svg+xml" />

        {/* Critical CSS to avoid render blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS to avoid render blocking */
            .chakra-heading {
              font-family: var(--font-bebas-neue), 'Bebas Neue', sans-serif !important;
              font-size: 6rem !important;
              color: #606c38 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            /* Critical layout styles */
            body { margin: 0; padding: 0; height: 100%; }
            html { height: 100%; }
            #__next { height: 100%; }
            /* Critical Chakra UI styles */
            .chakra-ui-light { color-scheme: light; }
            .chakra-ui-dark { color-scheme: dark; }
            /* Performance optimizations */
            * { box-sizing: border-box; }
            img { max-width: 100%; height: auto; }
            /* Accessibility improvements */
            [role="heading"] { outline: none; }
            [role="heading"]:focus { outline: 2px solid #606c38; outline-offset: 2px; }
          `,
        }}
        />
      </head>
      <body style={{ height: '100%' }}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
