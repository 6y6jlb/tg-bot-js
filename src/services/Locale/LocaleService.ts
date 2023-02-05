import i18next, { i18n } from "i18next";
import { default as en } from "../../i18n-js/json/en.json";
import { default as ru } from "../../i18n-js/json/ru.json";


class LocaleService {
    i18: i18n

    constructor() {
        i18next.init({
            lng: 'en',
            debug: true,
            resources: {
                en: {
                    translation: en
                },
                ru: {
                    translation: ru
                },
            }
        });

        this.i18 = i18next

    }

    public changeLanguage(langugeCode: string) {

        if (langugeCode === this.getLanguage()) {
            return;
        }

        switch (langugeCode) {
            case 'eu':
            case 'ru':
                this.i18.changeLanguage(langugeCode);
                break;

            default:
                break;
        }


        return;
    }

    public getLanguage() {
        return this.i18.language;
    }
}

export default new LocaleService();