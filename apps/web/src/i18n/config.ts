import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// Import des fichiers de traduction
import translationFr from '../locales/fr/translation.json';
i18n
    .use(initReactI18next) // Intégration avec React
    .init({
        resources: {
            fr: { translation: translationFr },
        },
        lng: 'fr', // Langue par défaut
        fallbackLng: 'en', // Langue par défaut si aucune langue détectée
        debug: true, // Affiche les logs en mode développement
        interpolation: {
            escapeValue: false, // React gère déjà l'échappement
        },
    });
export default i18n;