import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enCommon from '../locales/en/common.json'
import enForm from '../locales/en/form.json'
import enDoc from '../locales/en/doc.json'
import arCommon from '../locales/ar/common.json'
import arForm from '../locales/ar/form.json'
import arDoc from '../locales/ar/doc.json'

const resources = {
  en: {
    common: enCommon,
    form: enForm,
    doc: enDoc,
  },
  ar: {
    common: arCommon,
    form: arForm,
    doc: arDoc,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n


