import i18next from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import HttpBackend from 'i18next-http-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import { initReactI18next } from 'react-i18next'

i18next
  .use(initReactI18next)
  .use(ChainedBackend)
  .init({
    lng: 'ru',
    supportedLngs: ['ru'],
    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [
        {
          expirationTime: 1000 // 60 * 60 * 1000 // 1 hr
        },
        {
          loadPath: '/locales/{{lng}}/translation.json'
        }
      ]
    }
  })
