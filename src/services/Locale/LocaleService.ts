import i18next, { i18n } from "i18next";
import { default as en, default as ru } from "../../i18n-js/json/en.json";


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
}

export default new LocaleService();