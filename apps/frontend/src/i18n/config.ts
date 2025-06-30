import type { InitOptions } from 'i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import common from './locales/common.json'

export enum Locales {
  FR = 'fr',
}

export const config: InitOptions = {
  debug: false,
  ns: ['common', 'errors'],
  defaultNS: 'common',
  fallbackNS: 'common',
  resources: {
    [Locales.FR]: {
      common,
    },
  },
  lng: Locales.FR,
  fallbackLng: Locales.FR,
  interpolation: {
    escapeValue: false,
  },
}

// Ne pas initialiser automatiquement
// i18n.use(initReactI18next).init(config)

export const locales = [{ locale: Locales.FR, name: 'Français' }]

// Fonction d'initialisation à appeler côté client
export async function initI18n() {
  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init(config)
  }
  return i18n
}

export default i18n
