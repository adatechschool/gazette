// Constantes pour les breakpoints responsive
export const BREAKPOINTS = {
  mobile: 'base',
  tablet: 'md',
  desktop: 'lg',
  wide: 'xl',
} as const

// Props responsive communes
export const RESPONSIVE_PROPS = {
  // Espacement
  gap: { base: 4, lg: 10 },
  padding: { base: 4, lg: 10 },

  // Typographie
  fontSize: {
    small: { base: 'sm', lg: 'md' },
    medium: { base: 'md', lg: 'lg' },
    large: { base: 'lg', lg: 'xl' },
    xlarge: { base: 'xl', lg: '2xl' },
  },

  // Affichage
  display: {
    mobileOnly: { base: 'block', lg: 'none' },
    desktopOnly: { base: 'none', lg: 'block' },
    mobileDesktop: { base: 'block', lg: 'flex' },
  },

  // Layout
  flexDirection: {
    columnRow: { base: 'column', lg: 'row' },
    rowColumn: { base: 'row', lg: 'column' },
  },
} as const
