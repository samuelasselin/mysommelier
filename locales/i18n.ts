import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        resources: {
            fr: {
                translation: {
                    "mainTitle": "Savourez, comprenez, adorez le vin !",
                    "mainQuestion": "Quel est le nom du vin que vous buvez?",
                    "mainButton": 'Comprendre ce vin',
                    "createdBy": 'Créé par',
                    "copy": 'Copié'
                }
            },
            en: {
                translation: {
                    "mainTitle": "Learn, understand, enhance wine tasting!",
                    "mainQuestion": "What is the name of the wine you are drinking?",
                    "mainButton": 'Understand this wine',
                    "createdBy": 'Created by',
                    "copy": "Copied"
                }
            },
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;