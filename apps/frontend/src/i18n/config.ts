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

export const locales = [{ locale: Locales.FR, name: 'Français' }]

// Initialize i18n synchronously
i18n.use(initReactI18next).init(config)

export default i18n
