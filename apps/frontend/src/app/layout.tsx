import ClientProviders from '@/components/providers/ClientProviders'

/**
 * Interface définissant les propriétés du composant RootLayout
 * @interface RootLayoutProps
 */
interface RootLayoutProps {
  /** Les composants enfants à rendre dans le layout */
  children: ReactNode
}

/**
 * * Composant racine de l'application Next.js
 * 
 * Ce composant définit la structure HTML de base de l'application,
 * incluant les polices Google Fonts et les providers clients.
 * 
 * @component
 * @param {RootLayoutProps} props - Les propriétés du composant
 * @param {ReactNode} props.children - Les composants enfants à rendre
 * @returns {JSX.Element} Structure HTML racine de l'application
 * 
 * @example
 * ```tsx
 * // Utilisation automatique par Next.js
 * export default function RootLayout({ children }: RootLayoutProps) {
 *   return (
 *     <html lang="fr">
 *       <body>
 *         <ClientProviders>
 *           {children}
 *         </ClientProviders>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 * 
 * @see {@link ClientProviders} Pour la configuration des providers
 * @since 1.0.0
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
          {/* Préconnexion aux serveurs de Google Fonts pour optimiser les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* 
         * Chargement des polices Google Fonts
         * - Staatliches : Police décorative pour les titres
         * - Poppins : Police principale avec différents poids
         */}
        <link
          href="https://fonts.googleapis.com/css2?family=Staatliches&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Wrapper pour tous les providers React (Context, etc.) */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
