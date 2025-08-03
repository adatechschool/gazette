import { Bebas_Neue, Poppins } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-poppins',
})

export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-bebas-neue',
})

export const fontVariables = {
  '--font-poppins': poppins.style.fontFamily,
  '--font-bebas-neue': bebasNeue.style.fontFamily,
}
